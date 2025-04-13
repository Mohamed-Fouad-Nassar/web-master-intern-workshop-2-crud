import { createContext, useContext, useEffect } from "react";

import useLocalStorage from "../hooks/useLocalStorage";

const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorage(
    window.matchMedia("(prefers-color-scheme: dark)").matches,
    "isDarkMode"
  );

  useEffect(() => {
    if (isDarkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((cur) => !cur);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
