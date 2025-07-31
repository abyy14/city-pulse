import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Splash from './pages/Splash/Splash';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/SignUp';
import Favourites from './pages/Favourites/Favourites';
import ProtectedRoute from './components/common/ProtectedRoute';
import { useSyncUser } from './hooks/useUserSync';
import Profile from './pages/Profile';
import MainLayout from './pages/MainLayout';
import EventDetailPage from './pages/ViewEvent/EventDetailPage';

function App() {
  useSyncUser();
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
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
  );
}

export default App;
