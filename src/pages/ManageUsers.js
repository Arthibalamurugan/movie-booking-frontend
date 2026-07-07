import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');

    const fetchUsers = async () => {
        try {
            const res = await API.get('/admin/users');
            setUsers(res.data.data || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const changeRole = async (id, currentRole) => {
        try {
            const newRole = currentRole === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN';
            await API.put(`/admin/users/${id}/role`, { role: newRole });
            setMessage('✅ User role updated successfully');
            fetchUsers();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Role update failed');
        }
    };

    const filtered = users.filter((u) =>
        u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8 pb-10">
            <div className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">User management</p>
                    <h1 className="mt-4 text-4xl font-semibold text-white">Platform members & admin control</h1>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Manage user accounts, assign admin privileges, and monitor platform members.</p>
                </div>
            </div>

            {message && (
                <div className="glass-panel rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-100 shadow-soft">{message}</div>
            )}

            <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                    />
                </div>

                {loading ? (
                    <div className="space-y-4">
                        {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="h-20 animate-pulse rounded-3xl bg-white/5" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center text-slate-400">
                        <p className="text-lg font-semibold text-white">No users found</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((user) => (
                            <article key={user.id} className="flex items-center justify-between gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 transition hover:bg-slate-900">
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-lg font-semibold text-white">{user.fullName}</h3>
                                    <p className="text-sm text-slate-400">{user.email}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className={`rounded-full px-4 py-2 text-xs font-semibold ${user.role === 'ROLE_ADMIN' ? 'bg-red-500/15 text-red-200' : 'bg-emerald-500/15 text-emerald-200'}`}>
                                        {user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                                    </span>
                                    <button
                                        onClick={() => changeRole(user.id, user.role)}
                                        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${user.role === 'ROLE_ADMIN' ? 'border border-amber-500/30 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20' : 'border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20'}`}
                                    >
                                        {user.role === 'ROLE_ADMIN' ? 'Make User' : 'Make Admin'}
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUsers;
