import { BrowserRouter as Router, Routes, Route, useNavigationType, useLocation } from 'react-router-dom';
import LandingPage from './pages/Landpage'
import SignUpPage from './components/SignUpPage';
import { useEffect } from "react";
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import React from 'react';
import DetailedMoviePage from './components/DetailedMoviePage';

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/home":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/movie/:id" element={<DetailedMoviePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
}
export default App;
