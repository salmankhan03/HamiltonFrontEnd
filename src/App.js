import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginPage from './pages/Login';
import PrivateRoute from "./PrivateRoute";
import Admin from "./pages/Admin";
import Kitchen from './pages/Kitchen';
import Concierge from './pages/Concierge';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false)
  const AuthData = useSelector(state => state.AuthReducer.userData);

  console.log('AuthData--------------------------', AuthData)

  useEffect(() => {
    if (AuthData) {
      console.log('AuthData-------123112-------------------', AuthData)
      setLoggedIn(true)
    }
  }, [])

  console.log('isLoggedIn-------------------------------', isLoggedIn)

  return (
    <div className="App">
      <Router>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<PrivateRoute element={<Admin />} isAuthenticated={isLoggedIn} fallbackPath="/login" />} />
            <Route path="/admin" element={<PrivateRoute element={<Admin />} isAuthenticated={isLoggedIn} fallbackPath="/login" />} />
            <Route path="/kitchen" element={<PrivateRoute element={<Kitchen />} isAuthenticated={isLoggedIn} fallbackPath="/login" />} />
            <Route path="/concierge" element={<PrivateRoute element={<Concierge />} isAuthenticated={isLoggedIn} fallbackPath="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
