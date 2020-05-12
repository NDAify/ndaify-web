import React, {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
  useMemo,
} from 'react';

import { setCookie, getCookie, destroyCookie, BASE_COOKIE_OPTIONS } from '../lib/cookies';

const context = createContext();

const prefersDark = '(prefers-color-scheme: dark)';

export const useSystemAppearance = () => {
  const [appearance, setAppearance] = useState(
    () => (window.matchMedia(prefersDark).matches ? 'dark' : 'light'),
  );

  useEffect(() => {
    const darkQuery = window.matchMedia(prefersDark);
    const onChange = (event) => setAppearance(
      event.matches ? 'dark' : 'light',
    );

    darkQuery.addListener(onChange);
    return () => {
      darkQuery.removeListener(onChange);
    };
  }, [setAppearance]);

  return appearance;
};

export const getThemePreference = (ctx) => {
  return getCookie(ctx, 'theme', BASE_COOKIE_OPTIONS);
}

export const ThemeProvider = ({ children, ...props }) => {
  const [preferredTheme, setPreferredTheme] = useState(
    () => props.preferredTheme,
  );

  const setPreferredThemeWithSideEffects = useCallback((preference) => {
    if (preference === preferredTheme) {
      return;
    }

    if (preferredTheme && preference) {
      document.body.classList.replace(preferredTheme, preference);
    } else if (preference) {
      document.body.classList.add(preference);
    } else if (preferredTheme) {
      document.body.classList.remove(preferredTheme);
    }

    if (preference) {
      setCookie(null, 'theme', preference, BASE_COOKIE_OPTIONS);
    } else {
      destroyCookie(null, 'theme', BASE_COOKIE_OPTIONS);
    }

    setPreferredTheme(preference);
  }, [preferredTheme]);

  const contextValue = useMemo(() => [
    preferredTheme, setPreferredThemeWithSideEffects,
  ], [preferredTheme, setPreferredThemeWithSideEffects]);

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
};

const useTheme = () => useContext(context);

export default useTheme;
