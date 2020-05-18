import { getLangDir } from 'rtl-detect';

const parseLocaleParts = (locale) => {
  // TODO this implementation is too naive
  const [language, country] = locale.split('-');

  return {
    language,
    country,
    dir: getLangDir(locale),
  };
};

export default parseLocaleParts;
