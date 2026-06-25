import React, { useState } from 'react';
import API from '../api/axios';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                '/auth/forgot-password',
                { email }
            );

            setMessage(res.data.message);

        } catch (err) {

            setMessage(
                err.response?.data?.message ||
                'Failed to send reset email'
            );
        }
    };

    return (
        <div className="max-w-md mx-auto glass-panel p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">
                Forgot Password
            </h2>

            {message && (
                <div className="mb-4 text-green-400">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Enter email"
                    className="w-full mb-4 p-3 rounded-xl bg-slate-900 text-white"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />

                <button
                    className="glass-button-primary w-full"
                >
                    Send Reset Link
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;