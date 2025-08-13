import React from 'react';
import SignIn from './components/SignIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthForm from './components/AuthForm';
import ForgotPassword from './components/ForgotPassword';
import Dashboard from "./components/Dashboard";


import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<AuthForm />} />
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
