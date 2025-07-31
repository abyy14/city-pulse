import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from './pages/Splash/Splash';
import Login from './pages/Login';
import Register from './pages/SignUp';
import Favourites from './pages/Favourites';
import ProtectedRoute from './components/ProtectedRoute';
import { useSyncUser } from './hooks/useUserSync';
import Profile from './pages/Profile';
import MainLayout from './pages/MainLayout';
import EventDetailPage from './pages/EventDetailPage';
import { useDirection } from './context/DirectionContext';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import EventContainer from './components/EventContainer';

function App() {
  useSyncUser();
  const { theme, emotionCache } = useDirection();
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<MainLayout />}>
          <Route path="/events" element={<EventContainer />} />
          <Route path="/events/:id" element={<EventDetailPage />} />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favourites />
              </ProtectedRoute>
            }
          />

          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Route>

        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />


        {/* Optionally catch all unmatched routes */}
        <Route path="*" element={<Splash />} />
      </Routes>
    </Router>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
