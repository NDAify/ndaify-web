import React, {
  Fragment,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';
import { IntlProvider as IntlProviderImpl } from 'react-intl';

import {
  setCookie, getCookie, destroyCookie, BASE_COOKIE_OPTIONS,
} from './cookies';
import parseLocaleParts from '../utils/parseLocaleParts';

const SUPPORTED_LOCALES_TO_LANG = {
  // English
  en: 'en',
  // Chinese
  zh: 'zh',
};
const SUPPORTED_LOCALES = Object.keys(SUPPORTED_LOCALES_TO_LANG);

const DEFAULT_LOCALE_PARTS = parseLocaleParts('en');

const context = createContext();

export const getLocalePreference = (ctx) => getCookie(ctx, 'locale', BASE_COOKIE_OPTIONS);

export const pickSupportedLocale = (requestedLocale, supportedLocales = SUPPORTED_LOCALES) => {
  if (requestedLocale) {
    if (supportedLocales.find((locale) => locale === requestedLocale)) {
      return requestedLocale;
    }

    const { language } = parseLocaleParts(requestedLocale);

    if (supportedLocales.find((locale) => locale === language)) {
      return language;
    }
  }

  return DEFAULT_LOCALE_PARTS.language;
};

export const loadMessages = async (language) => {
  const messages = await import(`../langs/${language}.json`).then((mod) => mod.default);
  return messages;
};

export const IntlProvider = ({ children, ...props }) => {
  const messagesCache = useRef({
    [props.locale]: props.initialMessages,
  });

  const [preferredLocale, setPreferredLocale] = useState(props.preferredLocale);
  const [locale, setLocale] = useState(props.locale);

  const setPreferredLocaleWithSideEffects = useCallback(async (preference) => {
    if (preference === preferredLocale) {
      return;
    }

    if (preference) {
      setCookie(null, 'locale', preference, BASE_COOKIE_OPTIONS);
    } else {
      destroyCookie(null, 'locale', BASE_COOKIE_OPTIONS);
    }

    setPreferredLocale(preference);

    // install new locale
    const newLocale = pickSupportedLocale(preference || props.systemLocale);

    const { language, dir } = parseLocaleParts(newLocale);
    document.documentElement.lang = language;
    document.documentElement.dir = dir;

    const messages = await loadMessages(language);
    messagesCache.current[language] = messages;

    setLocale(newLocale);
  }, [preferredLocale, props.systemLocale]);

  const contextValue = useMemo(() => [
    preferredLocale, setPreferredLocaleWithSideEffects, locale,
  ], [preferredLocale, setPreferredLocaleWithSideEffects, locale]);

  const { language } = parseLocaleParts(locale);
  const messages = messagesCache.current[language];

  return (
    <context.Provider value={contextValue}>
      <IntlProviderImpl
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        locale={locale}
        defaultLocale={DEFAULT_LOCALE_PARTS.language}
        messages={messages}
        textComponent={Fragment}
      >
        {children}
      </IntlProviderImpl>
    </context.Provider>
  );
};

const useLocale = () => useContext(context);

export default useLocale;
