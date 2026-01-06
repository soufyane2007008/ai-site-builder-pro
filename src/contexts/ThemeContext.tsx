import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  setColors: (colors: ThemeColors) => void;
  resetColors: () => void;
}

const defaultColors: ThemeColors = {
  primary: '199 89% 48%',
  secondary: '270 70% 60%',
  accent: '199 89% 48%',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [colors, setColorsState] = useState<ThemeColors>(defaultColors);

  useEffect(() => {
    const savedColors = localStorage.getItem('ntfly_theme');
    if (savedColors) {
      setColorsState(JSON.parse(savedColors));
    }
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', colors.primary);
    document.documentElement.style.setProperty('--secondary', colors.secondary);
    document.documentElement.style.setProperty('--accent', colors.accent);
  }, [colors]);

  const setColors = (newColors: ThemeColors) => {
    setColorsState(newColors);
    localStorage.setItem('ntfly_theme', JSON.stringify(newColors));
  };

  const resetColors = () => {
    setColorsState(defaultColors);
    localStorage.removeItem('ntfly_theme');
  };

  return (
    <ThemeContext.Provider value={{ colors, setColors, resetColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
