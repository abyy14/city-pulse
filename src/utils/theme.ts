// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const ltrTheme = createTheme({
  direction: 'ltr',
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export const rtlTheme = createTheme({
  direction: 'rtl',
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
