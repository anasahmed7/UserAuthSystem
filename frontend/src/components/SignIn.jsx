import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/AuthForm.css";
import { Link } from 'react-router-dom';

function SignIn({ onToggle }) {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Load saved credentials if Remember Me was used
    useEffect(() => {
        const savedUsername = localStorage.getItem('rememberUsername');
        const savedPassword = localStorage.getItem('rememberPassword');

        if (savedUsername && savedPassword) {
            setUsernameOrEmail(savedUsername);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    const handleSignIn = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    username: usernameOrEmail,
                    password
                })
            });

            const text = await response.text();

            if (response.ok) {
                if (text.toLowerCase().includes("incorrect")) {
                    setMessage('❌ ' + text);
                } else {
                    try {
                        const data = JSON.parse(text);
                        localStorage.setItem('user', JSON.stringify(data));

                        if (rememberMe) {
                            localStorage.setItem('rememberUsername', usernameOrEmail);
                            localStorage.setItem('rememberPassword', password);
                        } else {
                            localStorage.removeItem('rememberUsername');
                            localStorage.removeItem('rememberPassword');
                        }


                        setMessage(`✅ Welcome, ${data.firstName}!`);

                        // Redirect after 2 seconds
                        setTimeout(() => {
                            window.location.href = '/dashboard';
                        }, 1500);

                    } catch {
                        setMessage('❌ ' + text);
                    }
                }
            } else {
                setMessage('❌ ' + text);
            }
        } catch (error) {
            setMessage('❌ Error: ' + error.message);
        }
    };

    return (
        <div className="auth-form">
            <h2>Sign In</h2>
            <form onSubmit={handleSignIn}>
                <input
                    type="text"
                    placeholder="Username or Email"
                    value={usernameOrEmail}
                    onChange={(e) => setUsernameOrEmail(e.target.value)}
                    required
                />

                {/* Password Input with Eye Icon */}
                <div style={{ position: 'relative' }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', paddingRight: '35px' }}
                    />
                    <span
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            right: '10px',
                            transform: 'translateY(-50%)',
                            cursor: 'pointer',
                            color: 'gray'
                        }}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <div className="remember-me">
                    <input
                        type="checkbox"
                        id="remember"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label htmlFor="remember">Remember Me</label>
                </div>

                <button type="submit">Sign In</button>
            </form>

            {message && <p>{message}</p>}

            <p>
                Don't have an account?{" "}
                <span onClick={onToggle} style={{ color: 'red', cursor: 'pointer' }}>
                    Sign Up
                </span>
            </p>
            <p>
                Forgot your password?{" "}
                <span
                    onClick={() => window.location.href = '/forgot-password'}
                    style={{ color: 'red', cursor: 'pointer' }}
                >
                    Reset Password
                </span>
            </p>
        </div>
    );
}

export default SignIn;
