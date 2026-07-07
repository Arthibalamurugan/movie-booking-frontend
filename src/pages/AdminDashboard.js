import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [revenue, setRevenue] = useState(null);
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
        API.get('/admin/revenue').then((res) => setRevenue(res.data.data)).catch(console.error);
        API.get('/admin/analytics').then((res) => setAnalytics(res.data.data)).catch(console.error);
    }, []);

    const bookingChartData = {
        labels: ['Confirmed', 'Cancelled'],
        datasets: [
            {
                data: [revenue?.confirmedBookings || 0, revenue?.cancelledBookings || 0],
                backgroundColor: ['#3B82F6', '#E50914'],
                borderColor: ['#3B82F6', '#E50914'],
                borderWidth: 1
            }
        ]
    };

    const analyticsChartData = {
        labels: ['Users', 'Movies', 'Shows', 'Bookings'],
        datasets: [
            {
                label: 'Platform metrics',
                data: [analytics?.totalUsers || 0, analytics?.totalMovies || 0, analytics?.totalShows || 0, analytics?.totalBookings || 0],
                backgroundColor: ['#E50914', '#3B82F6', '#F59E0B', '#22C55E']
            }
        ]
    };

    return (
        <div className="space-y-10 pb-10">
            <header className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Admin dashboard</p>
                        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Cinema operations in one premium control room.</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Monitor revenue, bookings, users and theatre activity with a polished analytics experience.</p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.35em] text-slate-200">Admin mode</div>
                </div>
            </header>

            <div className="grid gap-6 lg:grid-cols-4">
                <div className="glass-card p-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Total revenue</p>
                    <p className="mt-4 text-4xl font-semibold text-white">₹{revenue?.totalRevenue || 0}</p>
                    <p className="mt-2 text-sm text-slate-400">Overall ticket sales year-to-date.</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Total bookings</p>
                    <p className="mt-4 text-4xl font-semibold text-white">{revenue?.totalBookings || 0}</p>
                    <p className="mt-2 text-sm text-slate-400">Confirmed reservations across theatres.</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Total users</p>
                    <p className="mt-4 text-4xl font-semibold text-white">{analytics?.totalUsers || 0}</p>
                    <p className="mt-2 text-sm text-slate-400">Active members of the cinema platform.</p>
                </div>
                <div className="glass-card p-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Occupancy rate</p>
                    <p className="mt-4 text-4xl font-semibold text-white">{analytics?.occupancyRate || 0}%</p>
                    <p className="mt-2 text-sm text-slate-400">Average seat fill percentage.</p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Revenue split</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">Booking status</h2>
                        </div>
                    </div>
                    <Doughnut data={bookingChartData} />
                </div>

                <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Platform metrics</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">Growth overview</h2>
                        </div>
                    </div>
                    <Bar data={analyticsChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
                <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Quick actions</p>
                            <h2 className="mt-2 text-2xl font-semibold text-white">Launch workflows</h2>
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Link className="glass-button-primary" to="/admin/add-movie">Add Movie</Link>
                        <Link className="glass-button-primary" to="/admin/create-show">Create Show</Link>
                        <Link className="glass-button-secondary" to="/admin/manage-movies">Manage Movies</Link>
                        <Link className="glass-button-secondary" to="/admin/manage-shows">Manage Shows</Link>
                         <Link className="glass-button-secondary" to="/admin/users"> Manage Users</Link>
                    </div>
                </div>
                <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Recent activity</p>
                    <ul className="mt-5 space-y-4 text-sm text-slate-300">
                        <li className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">Last update: analytics refreshed automatically.</li>
                        <li className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">Revenue streams are showing steady bookings.</li>
                        <li className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">Use the quick actions to manage movies and shows.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
