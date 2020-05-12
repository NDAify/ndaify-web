import acceptLanguageParser from 'accept-language-parser';

const getSystemLocale = (ctx) => {
  let locale;
  if (process.browser) {
    locale = navigator?.language;
  } else {
    const acceptLanguage = ctx.req.headers['accept-language'];
    const values = acceptLanguageParser.parse(acceptLanguage);
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

export default getSystemLocale;
