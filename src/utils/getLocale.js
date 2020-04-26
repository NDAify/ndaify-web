import acceptLanguageParser from 'accept-language-parser';

const getLocale = (acceptLanguageHeader, fallback = 'en') => {
  let locale = fallback;
  if (process.browser && navigator.language) {
    locale = navigator.language;
  } else {
    const values = acceptLanguageParser.parse(acceptLanguageHeader);
    if (values.length > 0) {
      const value = values[0];
      locale = value.code;
      if (value.region) {
        locale = `${value.code}-${value.region}`;
      }
    }
  }

  return locale;
};

export default getLocale;
