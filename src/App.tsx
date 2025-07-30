import React from 'react';
import logo from './logo.svg';
import './App.css';
import Splash from './components/Splash/Splash';
import Home from './components/Home/Home';
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
