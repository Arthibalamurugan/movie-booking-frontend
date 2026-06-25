import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const ResetPassword = () => {

    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await API.post(
                '/auth/reset-password',
                {
                    token,
                    newPassword: password
                }
            );

            setMessage(res.data.message);

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {

            setMessage(
                err.response?.data?.message ||
                'Reset failed'
            );
        }
    };

    return (
        <div className="max-w-md mx-auto glass-panel p-8 rounded-3xl">
            <h2 className="text-3xl font-bold text-white mb-6">
                Reset Password
            </h2>

            {message && (
                <div className="mb-4 text-green-400">
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    className="w-full mb-4 p-3 rounded-xl bg-slate-900 text-white"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />

                <button
                    className="glass-button-primary w-full"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;