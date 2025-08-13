import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../assets/AuthForm.css";
import countries from 'world-countries';

const countryList = countries.map(c => c.name.common).sort();

function SignUp({ onToggle }) {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        country: '',
        city: '',
        post_code: '',
        street: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('❌ Passwords do not match.');
            return;
        }

        const payload = {
            firstName: formData.first_name,
            lastName: formData.last_name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            address: {
                country: formData.country,
                city: formData.city,
                postCode: formData.post_code,
                street: formData.street
            }
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const text = await response.text();
            setMessage((response.ok ? '✅ ' : '❌ ') + text);

        } catch (error) {
            setMessage('❌ Error: ' + error.message);
        }
    };

    return (
        <div className="auth-form">
            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <input name="first_name" type="text" placeholder="First Name *" value={formData.first_name} onChange={handleChange} required />
                <input name="last_name" placeholder="Last Name *" value={formData.last_name} onChange={handleChange} required />
                <input name="username" placeholder="Username *" value={formData.username} onChange={handleChange} required />
                <input name="email" placeholder="Email *" value={formData.email} onChange={handleChange} required />

                {/* Password Field */}
                <div className="password-field">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password *"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="eye-icon"
                        onMouseDown={() => setShowPassword(true)}
                        onMouseUp={() => setShowPassword(false)}
                        onMouseLeave={() => setShowPassword(false)}
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                {/* Confirm Password Field */}
                <div className="password-field">
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        placeholder="Confirm Password *"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <span
                        className="eye-icon"
                        onMouseDown={() => setShowConfirmPassword(true)}
                        onMouseUp={() => setShowConfirmPassword(false)}
                        onMouseLeave={() => setShowConfirmPassword(false)}
                    >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                </div>

                <select name="country" value={formData.country} onChange={handleChange} required>
                    <option value="">Select Country *</option>
                    {countryList.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>

                <input name="city" placeholder="City" value={formData.city} onChange={handleChange} />
                <input name="post_code" placeholder="Postcode" value={formData.post_code} onChange={handleChange} />
                <input name="street" placeholder="Street" value={formData.street} onChange={handleChange} />

                <button type="submit">Sign Up</button>
            </form>

            {message && <p>{message}</p>}

            <p>
                Already have an account?{' '}
                <span onClick={onToggle} style={{ color: 'red', cursor: 'pointer' }}>
                    Sign In
                </span>
            </p>
        </div>
    );
}

export default SignUp;
