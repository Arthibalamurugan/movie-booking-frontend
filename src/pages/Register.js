import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [form, setForm] = useState({ fullName: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const strengthLabel = (password) => {
        if (password.length > 10 && /[A-Z]/.test(password) && /\d/.test(password)) {
            return 'Strong';
        }
        if (password.length >= 8) {
            return 'Medium';
        }
        return 'Weak';
    };

    const handleChange = (e) => {
        const next = { ...form, [e.target.name]: e.target.value };
        setForm(next);
        if (e.target.name === 'password') {
            setPasswordStrength(strengthLabel(next.password));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await API.post('/auth/register', form);
            const { token, ...userData } = res.data.data;
            login(userData, token);
            navigate('/movies');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-76px)] bg-cinematic px-6 py-10 sm:px-10">
            <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                <section className="glass-panel relative overflow-hidden p-8 shadow-soft sm:p-10">
                    <div className="absolute left-0 top-0 h-40 w-40 -translate-x-1/3 -translate-y-1/3 rounded-full bg-cinemaRed/20 blur-3xl" />
                    <div className="relative z-10">
                        <p className="text-sm uppercase tracking-[0.45em] text-cinemaGold/80">Join the club</p>
                        <h2 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Create your premium cinema profile</h2>
                        <p className="mt-6 max-w-xl text-sm text-slate-300 md:text-base">Register to unlock curated show listings, smart recommendations, and seamless cinema booking.</p>

                        <div className="mt-10 grid gap-4 sm:grid-cols-2">
                            <div className="glass-card p-5">
                                <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Fast onboarding</p>
                                <p className="mt-3 text-sm text-slate-300">Get started in seconds with a simplified signup flow.</p>
                            </div>
                            <div className="glass-card p-5">
                                <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Member perks</p>
                                <p className="mt-3 text-sm text-slate-300">Access exclusive cinema offers, curated lists, and faster checkout.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="hero-panel overflow-hidden bg-slate-950/80 p-8 text-white shadow-glow sm:p-10">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Create account</p>
                            <h3 className="mt-2 text-3xl font-semibold">Sign up to start booking</h3>
                        </div>
                        <div className="rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/80">Secure</div>
                    </div>

                    {error && (
                        <div className="mb-5 rounded-3xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="grid gap-5">
                        <label className="block text-sm text-slate-300">
                            Full Name
                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/20"
                            />
                        </label>

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
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/20"
                            />
                        </label>

                        <div className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-300">
                            <span>Password strength</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${passwordStrength === 'Strong' ? 'bg-emerald-500/15 text-emerald-200' : passwordStrength === 'Medium' ? 'bg-amber-500/15 text-amber-200' : 'bg-red-500/10 text-red-200'}`}>
                                {passwordStrength || 'Weak'}
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-3xl bg-gradient-to-r from-cinemaRed to-cinemaGold px-6 py-3 text-base font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>

                    <div className="mt-8 rounded-3xl border border-white/10 bg-slate-900/70 p-5 text-center text-sm text-slate-400">
                        Already registered?{' '}
                        <Link to="/login" className="font-semibold text-white transition hover:text-cinemaRed">Login here</Link>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Register;
