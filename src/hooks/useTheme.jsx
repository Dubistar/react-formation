import { createContext } from "react";
import { useState } from "react";

export const ThemeContext = createContext('light'); // Default theme is 'light'

export function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
    <button onClick={toggleTheme}>Toggle Theme</button>

      {children}
    </ThemeContext.Provider>
  );
}