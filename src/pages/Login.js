import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await API.post('/auth/login', form);
            const { token, ...userData } = res.data.data;
            login(userData, token);
            navigate('/movies');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-76px)] bg-cinematic px-6 py-10 sm:px-10">
            <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[1.2fr_0.9fr]">
                <section className="hero-panel overflow-hidden bg-slate-950/80 p-8 text-white shadow-glow">
                    <div className="mb-8 rounded-[24px] bg-gradient-to-br from-cinemaRed/20 via-transparent to-cinemaBlue/10 p-6">
                        <p className="text-sm uppercase tracking-[0.45em] text-cinemaGold/80">Premium Cinema</p>
                        <h2 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">Your seat, your show, your story.</h2>
                        <p className="mt-6 max-w-xl text-sm text-slate-300 md:text-base">Experience a cinematic booking platform designed for movie lovers, with smart recommendations, fast checkout, and immersive movie discovery.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="glass-card p-5">
                            <h3 className="mb-3 text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Instant access</h3>
                            <p className="text-sm text-slate-300">Login quickly and browse curated theatre shows in a premium interface.</p>
                        </div>
                        <div className="glass-card p-5">
                            <h3 className="mb-3 text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Safe & secure</h3>
                            <p className="text-sm text-slate-300">Secure authentication with live error feedback and session handling.</p>
                        </div>
                    </div>
                </section>

                <section className="glass-panel relative overflow-hidden p-8 shadow-soft sm:p-10">
                    <span className="absolute left-0 top-0 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cinemaRed/20 blur-3xl" />
                    <span className="absolute bottom-0 right-0 h-40 w-40 translate-x-1/3 translate-y-1/3 rounded-full bg-cinemaBlue/10 blur-3xl" />

                    <div className="relative z-10">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Sign in</p>
                                <h3 className="mt-2 text-3xl font-semibold text-white">Welcome back</h3>
                            </div>
                            <div className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">Cinema Mode</div>
                        </div>

                        {error && (
                            <div className="mb-5 rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="grid gap-5">
                            <label className="block text-sm text-slate-300">
                                Email
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/20"
                                />
                            </label>

                            <label className="block text-sm text-slate-300">
                                Password
                                <div className="mt-3 relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={form.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 pr-32 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200 transition hover:bg-white/10"
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </label>

                            <div className="flex items-center justify-between text-sm text-slate-400">
                                <label className="inline-flex items-center gap-2">
                                    <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-slate-800 text-cinemaRed focus:ring-cinemaRed" />
                                    Remember me
                                </label>
                                <Link
                                   to="/forgot-password"
                                   className="text-cinemaBlue hover:text-white"
                               >
                                   Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="rounded-3xl bg-gradient-to-r from-cinemaRed to-cinemaGold px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? 'Signing in...' : 'Login to Continue'}
                            </button>
                        </form>

                        <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-center text-sm text-slate-400">
                            Don’t have an account?{' '}
                            <Link to="/register" className="font-semibold text-white transition hover:text-cinemaRed">Create one now</Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Login;
