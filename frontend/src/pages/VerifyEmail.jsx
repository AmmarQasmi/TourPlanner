import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { email, verificationToken, message } = location.state || {};

    useEffect(() => {
        if (!email || !verificationToken) {
            navigate('/clientsignup');
            return;
        }
        console.log('Email:', email);
        console.log('Token:', verificationToken);
    }, [email, verificationToken, navigate]);

    const handleChange = (index, value) => {
        if (isNaN(value)) return;

        const newCode = [...verificationCode];
        newCode[index] = value;
        setVerificationCode(newCode);
        setError('');

        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted');
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:5000/api/clients/verify-email', {
                email: email,
                code: verificationCode.join('')
            });

            if (!response.data.Error) {
                navigate('/home'); // TODO: redirect to user dashboard
            }
        } catch (error) {
            console.error('Verification error:', error);
            setError(error.response?.data?.message || 'Invalid verification code. Please try again.');
            setVerificationCode(['', '', '', '', '', '']);
            document.getElementById('code-0')?.focus();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body items-center text-center">
                    <h2 className="card-title text-2xl font-bold">Verify Your Email</h2>

                    {message && (
                        <div className="alert alert-success text-sm">
                            {message}
                        </div>
                    )}

                    <p className="text-sm text-base-content/70 mt-2">
                        We've sent a verification code to<br />
                        <span className="font-medium text-primary">{email}</span>
                    </p>

                    <form onSubmit={handleSubmit} className="w-full mt-6">
                        <div className="flex justify-center gap-2">
                            {verificationCode.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-${index}`}
                                    type="text"
                                    maxLength="1"
                                    className="input input-bordered w-12 h-12 text-center text-lg"
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Backspace' && !digit && index > 0) {
                                            const prevInput = document.getElementById(`code-${index - 1}`);
                                            prevInput?.focus();
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                            ))}
                        </div>

                        {error && (
                            <div className="alert alert-error mt-4 text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
                            disabled={verificationCode.some(digit => !digit) || isLoading}
                        >
                            {isLoading ? 'Verifying...' : 'Verify Email'}
                        </button>
                    </form>

                    <div className="mt-6 text-xs text-base-content/50">
                        <p>Please check your spam folder if you don't see the email in your inbox.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyEmail;