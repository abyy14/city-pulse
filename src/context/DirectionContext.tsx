// context/DirectionContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createTheme, Theme } from '@mui/material';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

type Direction = 'ltr' | 'rtl';

interface DirectionContextType {
  direction: Direction;
  toggleDirection: () => void;
  theme: Theme;
  emotionCache: any;
}

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export const DirectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [direction, setDirection] = useState<Direction>(() => {
    return (localStorage.getItem('direction') as Direction) || 'ltr';
  });

  useEffect(() => {
    localStorage.setItem('direction', direction);
    document.body.dir = direction;
  }, [direction]);

  const toggleDirection = () => {
    setDirection(prev => (prev === 'ltr' ? 'rtl' : 'ltr'));
  };

  const theme = useMemo(() => createTheme({ direction, typography : {
    fontFamily: 'Neue Plak, sans-serif',
  } }), [direction]);

  const emotionCache = useMemo(
    () =>
      createCache({
        key: direction === 'rtl' ? 'muirtl' : 'mui',
        stylisPlugins: direction === 'rtl' ? [rtlPlugin] : [],
      }),
    [direction]
  );

  return (
    <DirectionContext.Provider value={{ direction, toggleDirection, theme, emotionCache }}>
      {children}
    </DirectionContext.Provider>
  );
};

export const useDirection = () => {
  const context = useContext(DirectionContext);
  if (!context) {
    throw new Error('useDirection must be used within a DirectionProvider');
  }
  return context;
};

