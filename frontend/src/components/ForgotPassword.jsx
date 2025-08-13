import { useState } from 'react';
import { FaEye } from 'react-icons/fa';
import '../assets/AuthForm.css'; // Make sure this has proper styles

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showReset, setShowReset] = useState(false);
    const [token, setToken] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const requestToken = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const text = await res.text();
            setMessage(text);
            if (res.ok) setShowReset(true);
        } catch (error) {
            console.error('Request Token Error:', error);
            setMessage('Something went wrong. Please try again.');
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('❌ Passwords do not match');
            return;
        }

        try {
            const res = await fetch('http://localhost:8080/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword })
            });
            const text = await res.text();
            setMessage(text);
            if (res.ok) {
                setMessage("✅ Password changed successfully.");
                setTimeout(() => {
                    window.location.href = '/signin'; // or whatever your sign-in route is
                }, 2000); // waits 2 seconds so user can see the success message
            }
        } catch (error) {
            console.error('Reset Password Error:', error);
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="auth-form">
            {!showReset ? (
                <>
                    <h2>Forgot Password</h2>
                    <form onSubmit={requestToken}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Send Code</button>
                    </form>
                </>
            ) : (
                <>
                    <h2>Reset Password</h2>
                    <form onSubmit={resetPassword}>
                        <input
                            type="text"
                            placeholder="Enter Code"
                            value={token}
                            onChange={e => setToken(e.target.value)}
                            required
                        />

                        <div className="password-input-wrapper">
                            <input
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={e => setNewPassword(e.target.value)}
                                required
                            />
                            <span
                                className="password-toggle-icon"
                                onMouseDown={() => setShowNewPassword(true)}
                                onMouseUp={() => setShowNewPassword(false)}
                                onMouseLeave={() => setShowNewPassword(false)}
                            >
                                <FaEye />
                            </span>
                        </div>

                        <div className="password-input-wrapper">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm New Password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                required
                            />
                            <span
                                className="password-toggle-icon"
                                onMouseDown={() => setShowConfirmPassword(true)}
                                onMouseUp={() => setShowConfirmPassword(false)}
                                onMouseLeave={() => setShowConfirmPassword(false)}
                            >
                                <FaEye />
                            </span>
                        </div>

                        <button type="submit">Change Password</button>
                    </form>
                </>
            )}
            {message && <p>{message}</p>}
        </div>
    );
}

export default ForgotPassword;
