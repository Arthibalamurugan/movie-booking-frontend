import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [msg, setMsg] = useState('');

    const fetchBookings = async () => {
        try {
            const res = await API.get('/bookings/my');
            setBookings(res.data.data.content || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancel = async (id) => {
        if (!window.confirm('Cancel this booking?')) {
            return;
        }

        try {
            await API.put(`/bookings/${id}/cancel`);
            setMsg('✅ Booking cancelled successfully.');
            fetchBookings();
        } catch (err) {
            setMsg(err.response?.data?.message || '❌ Cancel failed');
        }
    };

    const downloadTicket = async (bookingId) => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(
                `http://localhost:8080/api/bookings/${bookingId}/ticket`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Download failed");
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = `ticket_${bookingId}.pdf`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            setMsg("❌ Ticket download failed");
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Bookings</p>
                        <h1 className="text-4xl font-semibold text-white md:text-5xl">Your cinema passes and ticket history</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Manage upcoming shows, download tickets, and cancel bookings with luxury cinema styling.</p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm uppercase tracking-[0.35em] text-slate-200">Ticket Desk</div>
                </div>
            </div>

            {msg && (
                <div className="glass-panel rounded-[28px] border border-white/10 bg-emerald-500/10 p-5 text-sm text-emerald-100 shadow-soft">
                    {msg}
                </div>
            )}

            {loading ? (
                <div className="grid gap-6 md:grid-cols-2">
                    {[...Array(4)].map((_, idx) => (
                        <div key={idx} className="glass-panel animate-pulse rounded-[28px] p-8 h-64" />
                    ))}
                </div>
            ) : bookings.length === 0 ? (
                <div className="glass-panel rounded-[28px] border border-white/10 p-10 text-center text-slate-300 shadow-soft">
                    <p className="text-2xl font-semibold text-white">No bookings found.</p>
                    <p className="mt-3 text-sm text-slate-400">Book a movie now to see your itinerary and ticket info here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {bookings.map((booking) => (
                        <article key={booking.bookingId} className="glass-panel overflow-hidden rounded-[28px] border border-white/10 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">{booking.movieTitle}</p>
                                            <h2 className="mt-3 text-2xl font-semibold text-white">{booking.theaterName}</h2>
                                        </div>
                                        <span className={`rounded-full px-4 py-2 text-sm font-semibold ${booking.bookingStatus === 'CONFIRMED' ? 'bg-emerald-500/15 text-emerald-200' : 'bg-red-500/15 text-red-200'}`}>
                                            {booking.bookingStatus}
                                        </span>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                                            <p className="uppercase tracking-[0.35em] text-slate-400">Show time</p>
                                            <p className="mt-2 text-lg font-semibold text-white">{new Date(booking.showTime).toLocaleString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</p>
                                        </div>
                                        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                                            <p className="uppercase tracking-[0.35em] text-slate-400">Seat</p>
                                            <p className="mt-2 text-lg font-semibold text-white">{booking.seatNumber}</p>
                                        </div>
                                        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                                            <p className="uppercase tracking-[0.35em] text-slate-400">Amount</p>
                                            <p className="mt-2 text-lg font-semibold text-white">₹{booking.amountPaid}</p>
                                        </div>
                                        <div className="rounded-3xl bg-slate-900/80 p-4 text-sm text-slate-300">
                                            <p className="uppercase tracking-[0.35em] text-slate-400">Payment</p>
                                            <p className="mt-2 text-lg font-semibold text-white">{booking.paymentStatus}</p>
                                        </div>
                                    </div>

                                    <div className="rounded-3xl bg-white/5 p-5 text-sm text-slate-300">
                                        <p className="font-semibold text-white">QR Code</p>

                                        <div className="mt-4 flex items-center justify-center rounded-3xl bg-slate-900/80 p-4">
                                            {booking.qrCodeUrl ? (
                                                <img
                                                    src={booking.qrCodeUrl}
                                                    alt="QR Code"
                                                    className="h-40 w-40 rounded-lg bg-white p-2"
                                                />
                                            ) : (
                                                <span className="text-slate-500">
                                                    QR Not Available
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 rounded-[28px] bg-slate-900/80 p-6 text-sm text-slate-300">
                                    <div className="rounded-3xl bg-slate-950/80 p-5">
                                        <p className="uppercase tracking-[0.35em] text-slate-400">Ticket ID</p>
                                        <p className="mt-2 font-semibold text-white">#{booking.bookingId}</p>
                                    </div>
                                    <button
                                        onClick={() => downloadTicket(booking.bookingId)}
                                        className="w-full rounded-3xl bg-cinemaRed px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#c40c14]"
                                    >
                                        Download Ticket
                                    </button>
                                    {booking.bookingStatus === 'CONFIRMED' && (
                                        <button onClick={() => handleCancel(booking.bookingId)} className="w-full rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white transition hover:bg-white/10">Cancel booking</button>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyBookings;
