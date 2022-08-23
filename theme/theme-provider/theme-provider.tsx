import { PropsWithChildren } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';

import { theme } from '../theme';
import { GlobalStyles } from './global-styles';
import '@fontsource/plus-jakarta-sans';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';


export function ThemeProvider({
  children,
}: PropsWithChildren<unknown>) {
  return (
    <MUIThemeProvider theme={theme}>
      <>
        <CssBaseline />
        <GlobalStyles />
        {children}
      </>
    </MUIThemeProvider>
  );
}
