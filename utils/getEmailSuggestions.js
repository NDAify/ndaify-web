import tlds from 'tlds';
import commonEmailProviders from 'email-providers/common.json';
import score from 'string-score';

const CONFIDENCE_SCORE = 0.6;
const CONFIDENCE_SCORE_WITH_EXACT_CHAR_COUNT_MATCH = 0.4;

// https://hackernoon.com/how-to-reduce-incorrect-email-addresses-df3b70cb15a9
const checkForCloseMatch = (sample, string) => {
  if (!string) {
    return null;
  }

  if (string.length < 3) {
    return null;
  };

  // contains?
  if (sample.includes(string)) {
    return null;
  };

  // split the string string into two at each postion e.g. g|mail gm|ail gma|il gmai|l
  for (let i = 1; i < string.length; i++) {
    const firstPart = string.substring(0, i);
    const secondPart = string.substring(i);

    // test for wrong letter
    const wrongLetterRegEx = new RegExp(`${firstPart}.${secondPart.substring(1)}`);
    if (wrongLetterRegEx.test(sample)) {
      return sample.replace(wrongLetterRegEx, string);
    }

    // test for extra letter
    const extraLetterRegEx = new RegExp(`${firstPart}.${secondPart}`);
    if (extraLetterRegEx.test(sample)) {
      return sample.replace(extraLetterRegEx, string);
    }

    // test for missing letter
    if (secondPart !== 'mail') {
      const missingLetterRegEx = new RegExp(`${firstPart}{0}${secondPart}`);
      if (missingLetterRegEx.test(sample)) {
        return sample.replace(missingLetterRegEx, string);
      }
    }

    // test for switched letters
    const switchedLetters = [
      string.substring(0, i - 1),
      string.charAt(i),
      string.charAt(i - 1),
      string.substring(i + 1),
    ].join('');

    if (sample.includes(switchedLetters)) {
      return sample.replace(switchedLetters, string);
    }
  }

  // if nothing was close, then there wasn't a typo
  return null;
}

const getClosestMatchedSuggestion = (string, dataset, matchWithSameCharLength) => {
  const scoredDataSet = dataset.map(data => ({ string, data, score: score(data, string, 0.99) }));

  const sortedDataSet = scoredDataSet.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }

    return 0;
  });
  
  const firstSuggestion = sortedDataSet[0].score >= CONFIDENCE_SCORE ? sortedDataSet[0].data : null;

  if (matchWithSameCharLength) {
    const suggestionWithSameCharLength = sortedDataSet.find((dataObj) => dataObj.string.length === dataObj.data.length && dataObj.score >= CONFIDENCE_SCORE_WITH_EXACT_CHAR_COUNT_MATCH);
    if (suggestionWithSameCharLength) {

      return suggestionWithSameCharLength.data;
    }

    return null;
  } else if (firstSuggestion) {

    return firstSuggestion;
  }

  return null;
}

const getSuggestion = (email) => {
  const [emailUserName, emailProvider] = email.split("@");
  if (!emailUserName || !emailProvider) {
    return null;
  }

  const [provider, tld] = emailProvider.split('.');
  if (!provider || !tld) {
    return null;
  }

  const closestMatchedTld = tlds.find((tldSample) => checkForCloseMatch(tldSample, tld)) || '';
  const closeMatchTldScore = score(closestMatchedTld, tld);
  const correctedTld = closeMatchTldScore >= CONFIDENCE_SCORE ? closestMatchedTld : getClosestMatchedSuggestion(tld, tlds, tld.length >= 3);

  const emailProviderWithCorrectTld = correctedTld ? `${provider}.${correctedTld}` : emailProvider;
  const correctedEmailProvider = getClosestMatchedSuggestion(emailProviderWithCorrectTld, commonEmailProviders);
  if (correctedEmailProvider) {
    if (emailProvider === correctedEmailProvider) {
      return null;
    }

    return `${emailUserName}@${correctedEmailProvider}`;
  } else if (!correctedEmailProvider && (tld === correctedTld)) {
    return null;
  }

  const closestMatchedEmailProvider = commonEmailProviders.find((emailProviderSample) => checkForCloseMatch(emailProviderSample, emailProviderWithCorrectTld));
  return closestMatchedEmailProvider || `${emailUserName}@${emailProviderWithCorrectTld}`;
};

export default getSuggestion;