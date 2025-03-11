'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

export default function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      {children}
      <ThemeToggle />
    </ThemeProvider>
  );
}