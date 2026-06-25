import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/95 backdrop-blur-xl shadow-soft">
            <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-6 py-4">
                <Link to="/movies" className="flex items-center gap-3 text-white">
                    <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-cinemaRed to-cinemaGold text-lg shadow-glow">
                        🎬
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.35em] text-cinemaGold/90">CinePulse</p>
                        <h1 className="text-xl font-semibold tracking-[0.02em] md:text-2xl">Cinema SaaS</h1>
                    </div>
                </Link>

                <nav className="hidden items-center gap-6 md:flex">
                    <Link className="text-sm text-slate-300 transition hover:text-white" to="/movies">Movies</Link>
                    <Link className="text-sm text-slate-300 transition hover:text-white" to="/my-bookings">My Bookings</Link>
                    {isAdmin && <Link className="text-sm text-cinemaBlue transition hover:text-white" to="/admin">Admin</Link>}
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    {user ? (
                        <>
                            <span className="rounded-full border border-white/10 bg-slate-900/80 px-3 py-2 text-sm text-slate-200 shadow-soft">Hi, {user.fullName}</span>
                            <button
                                onClick={handleLogout}
                                className="rounded-full bg-cinemaRed px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c40c14]"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10" to="/login">Login</Link>
                            <Link className="rounded-full bg-cinemaRed px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#c40c14]" to="/register">Register</Link>
                        </>
                    )}
                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/90 text-white transition hover:bg-slate-800 md:hidden"
                >
                    {open ? <FiX size={20} /> : <FiMenu size={20} />}
                </button>
            </div>

            {open && (
                <div className="border-t border-white/10 bg-slate-950/95 px-6 py-4 md:hidden">
                    <div className="flex flex-col gap-3">
                        <Link onClick={() => setOpen(false)} className="text-base text-slate-200 transition hover:text-white" to="/movies">Movies</Link>
                        <Link onClick={() => setOpen(false)} className="text-base text-slate-200 transition hover:text-white" to="/my-bookings">My Bookings</Link>
                        {isAdmin && <Link onClick={() => setOpen(false)} className="text-base text-cinemaBlue transition hover:text-white" to="/admin">Admin</Link>}
                        {user ? (
                            <button
                                onClick={() => {
                                    setOpen(false);
                                    handleLogout();
                                }}
                                className="rounded-2xl bg-cinemaRed px-4 py-3 text-left text-sm font-semibold text-white"
                            >
                                Logout
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <Link onClick={() => setOpen(false)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white" to="/login">Login</Link>
                                <Link onClick={() => setOpen(false)} className="rounded-2xl bg-cinemaRed px-4 py-3 text-sm font-semibold text-white" to="/register">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
