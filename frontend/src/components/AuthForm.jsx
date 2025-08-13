
import React, { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn((prev) => !prev);
    };

    return (
        <>
            {isSignIn ? (
                <SignIn onToggle={toggleForm} />
            ) : (
                <SignUp onToggle={toggleForm} />
            )}
        </>
    );
}

export default AuthForm;
