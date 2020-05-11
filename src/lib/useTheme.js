import { useEffect, useState, useCallback, createContext, useContext, useMemo } from "react";

const context = createContext();

const prefersDark = '(prefers-color-scheme: dark)';

export const useSystemAppearance = () => {
  const [appearance, setAppearance] = useState(
    () => window.matchMedia(prefersDark).matches ? 'dark' : 'light',
  );

  useEffect(() => {
    const darkQuery = window.matchMedia(prefersDark);
    const onChange = (event) => setAppearance(
      event.matches ? 'dark' : 'light',
    );

    darkQuery.addListener(onChange);
    return () => {
      darkQuery.removeListener(onChange);
    }
  }, [setAppearance]);

  return appearance;
};

export const ThemeProvider = ({ children, initialTheme }) => {
  const [theme, setTheme] = useState(
    () => initialTheme,
  );

  const setThemeWithSideEffects = useCallback((preference) => {
    if (preference === theme) {
      return;
    }

    if (theme && preference) {
      document.body.classList.replace(theme, preference);
    } else if (preference) {
      document.body.classList.add(preference);
    } else {
      document.body.classList.remove(theme);
    }

    setTheme(preference);
  }, [theme]);

  const contextValue = useMemo(() => [
    theme, setThemeWithSideEffects,
  ], [theme, setThemeWithSideEffects]);

  return (
    <context.Provider value={contextValue}>
      {children}
    </context.Provider>
  );
}

const useTheme = () => {
  return useContext(context);
}

export default useTheme;

