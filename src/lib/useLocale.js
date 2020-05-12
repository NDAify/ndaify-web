import React, {
  Fragment,
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { IntlProvider as IntlProviderImpl } from 'react-intl';

import { setCookie, getCookie, destroyCookie, BASE_COOKIE_OPTIONS } from '../lib/cookies';

import es from '../langs/es.json';
import zh from '../langs/zh.json';

const DEFAULT_LOCALE_PARTS = {
  language: 'en',
  dir: 'ltr',
};

const MESSAGES = {
  es,
  'es-ES': es,
  'es-US': es,
  'es-MX': es,
  'zh': zh,
};

const SUPPORTED_LOCALES = Object.keys(MESSAGES);

const context = createContext();

export const getLocalePreference = (ctx) => {
  return getCookie(ctx, 'locale', BASE_COOKIE_OPTIONS);
}

export const parseLocaleParts = (locale) => {
  const [language, country] = locale.split('-');

  return {
    language,
    country,
    // TODO derive dir from locale
    dir: 'ltr',
  }
}

export const pickSupportedLocale = (requestedLocale, supportedLocales = SUPPORTED_LOCALES) => {
  if (supportedLocales.find((locale) => locale === requestedLocale)) {
    return requestedLocale;
  }

  const { language } = parseLocaleParts(requestedLocale);

  if (supportedLocales.find((locale) => locale === language)) {
    return language;
  }

  return DEFAULT_LOCALE_PARTS.language;
}

export const IntlProvider = ({ children, ...props }) => {
  const [preferredLocale, setPreferredLocale] = useState(
    () => props.preferredLocale,
  );

  const setPreferredLocaleWithSideEffects = useCallback((preference) => {
    if (preference === preferredLocale) {
      return;
    }

    if (preference) {
      setCookie(null, 'locale', preference, BASE_COOKIE_OPTIONS);
    } else {
      destroyCookie(null, 'locale', BASE_COOKIE_OPTIONS);
    }

    setPreferredLocale(preference);
  }, [preferredLocale]);

  const contextValue = useMemo(() => [
    preferredLocale, setPreferredLocaleWithSideEffects,
  ], [preferredLocale, setPreferredLocaleWithSideEffects]);

  const locale = pickSupportedLocale(preferredLocale || props.systemLocale);

  useEffect(() => {
    const { language, dir } = parseLocaleParts(locale);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
  }, [locale]);

  return (
    <context.Provider value={contextValue}>
      <IntlProviderImpl
        {...props}
        locale={locale}
        defaultLocale={DEFAULT_LOCALE_PARTS.language}
        messages={MESSAGES[locale]}
        textComponent={Fragment}
      >
        {children}
      </IntlProviderImpl>
    </context.Provider>
  );
};

const useLocale = () => useContext(context);

export default useLocale;

