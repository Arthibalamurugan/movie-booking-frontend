import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Seats = () => {
    const { showId } = useParams();
    const [seats, setSeats] = useState([]);
    const [selected, setSelected] = useState(null);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [message, setMessage] = useState('');
    const [showInfo, setShowInfo] = useState(null);
    const navigate = useNavigate();

    const loadSeats = async () => {
        try {
            const res = await API.get(`/shows/${showId}/seats`);
            setSeats(res.data.data || []);
            const meta = res.data.data?.[0]?.showInfo;
            setShowInfo(meta || null);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadSeats();
    }, [showId]);

    const handleBook = async () => {
        if (!selected) return;
        setBooking(true);
        setMessage('');
        try {
            await API.post('/bookings', {
                showId: Number(showId),
                seatId: selected
            });
            setMessage('✅ Booking confirmed successfully. View your bookings.');
            await loadSeats();
            setSelected(null);
        } catch (err) {
            setMessage('❌ ' + (err.response?.data?.message || 'Booking failed'));
        } finally {
            setBooking(false);
        }
    };

    const seatColor = (seat) => {
        if (seat.status === 'BOOKED') return 'bg-red-500/95 border-red-500 text-white';
        if (seat.status === 'LOCKED') return 'bg-amber-500/95 border-amber-500 text-slate-950';
        if (selected === seat.id) return 'bg-emerald-500/95 border-emerald-400 text-white';
        return 'bg-slate-900/90 border-white/10 text-slate-200 hover:bg-slate-800';
    };

    const totalPrice = () => {
        const seat = seats.find((item) => item.id === selected);
        return seat ? seat.price ?? 0 : 0;
    };

    return (
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] pb-10">
            <section className="glass-panel rounded-[28px] border border-white/10 p-8 shadow-glow">
                <div className="mb-8 flex flex-col gap-4 rounded-[24px] bg-slate-950/80 p-6 text-white shadow-soft sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Seat selection</p>
                        <h1 className="mt-3 text-3xl font-semibold">Choose your perfect seat</h1>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        ← Back to shows
                    </button>
                </div>

                {loading ? (
                    <div className="grid gap-4">
                        {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="h-24 animate-pulse rounded-3xl bg-white/5" />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="mb-8 rounded-[28px] bg-slate-900/80 p-6 text-slate-200 shadow-soft">
                            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Screen this way</p>
                            <div className="mt-4 h-14 rounded-full bg-gradient-to-r from-white/10 via-white/20 to-white/10 text-center text-lg font-semibold uppercase tracking-[0.35em] text-slate-100 shadow-inner">
                                🎬 SCREEN
                            </div>
                        </div>

                        <div className="mb-7 rounded-[28px] bg-slate-950/80 p-6 shadow-soft">
                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                    <p className="uppercase tracking-[0.35em] text-slate-400">Selected seat</p>
                                    <p className="mt-2 text-xl font-semibold text-white">{selected ? seats.find((seat) => seat.id === selected)?.seatNumber : 'None'}</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                    <p className="uppercase tracking-[0.35em] text-slate-400">Show</p>
                                    <p className="mt-2 text-xl font-semibold text-white">{showInfo?.theaterName || 'Theater'}</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                    <p className="uppercase tracking-[0.35em] text-slate-400">Time</p>
                                    <p className="mt-2 text-xl font-semibold text-white">{showInfo ? new Date(showInfo.showTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '-'}</p>
                                </div>
                                <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                    <p className="uppercase tracking-[0.35em] text-slate-400">Available</p>
                                    <p className="mt-2 text-xl font-semibold text-white">{showInfo?.availableSeats ?? 0} Seats</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid gap-5 md:grid-cols-[1.7fr_0.9fr]">
                            <div className="rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
                                <div className="grid gap-3 sm:grid-cols-5">
                                    {['A', 'B', 'C', 'D', 'E'].map((row) => (
                                        <div key={row} className="text-center text-xs uppercase tracking-[0.35em] text-slate-400">Row {row}</div>
                                    ))}
                                </div>
                                <div className="mt-6 grid gap-4">
                                    {['A','B','C','D','E'].map((row) => (
                                        <div key={row} className="grid grid-cols-5 gap-4">
                                            {seats
                                                .filter((seat) => seat.seatNumber?.startsWith(row))
                                                .map((seat) => (
                                                    <button
                                                        key={seat.id}
                                                        type="button"
                                                        onClick={() => seat.status === 'AVAILABLE' ? setSelected(selected === seat.id ? null : seat.id) : null}
                                                        disabled={seat.status !== 'AVAILABLE'}
                                                        className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition ${seatColor(seat)} ${seat.status === 'AVAILABLE' ? 'hover:border-cinemaRed hover:ring-1 hover:ring-cinemaRed/20' : ''}`}
                                                    >
                                                        {seat.seatNumber}
                                                    </button>
                                                ))}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <aside className="sticky top-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-6 shadow-soft">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-white">Booking summary</h2>
                                        <p className="mt-2 text-sm text-slate-400">Review your selection before confirming.</p>
                                    </div>

                                    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
                                        <div className="grid gap-4">
                                            <div className="flex items-center justify-between">
                                                <span>Seat</span>
                                                <span className="font-semibold text-white">{selected ? seats.find((seat) => seat.id === selected)?.seatNumber : '—'}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Status</span>
                                                <span className="font-semibold text-white">{selected ? 'Selected' : 'Awaiting selection'}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span>Price</span>
                                                <span className="font-semibold text-white">₹{totalPrice()}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid gap-2 rounded-3xl border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-400">
                                        <div className="flex items-center gap-3"><span className="inline-flex h-3 w-3 rounded-full bg-slate-900 border border-white/10" /> Available</div>
                                        <div className="flex items-center gap-3"><span className="inline-flex h-3 w-3 rounded-full bg-emerald-500" /> Selected</div>
                                        <div className="flex items-center gap-3"><span className="inline-flex h-3 w-3 rounded-full bg-red-500" /> Booked</div>
                                        <div className="flex items-center gap-3"><span className="inline-flex h-3 w-3 rounded-full bg-amber-500" /> Locked</div>
                                    </div>

                                    {message && (
                                        <div className={`rounded-3xl border p-4 text-sm ${message.startsWith('✅') ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-100' : 'border-red-500/20 bg-red-500/10 text-red-100'}`}>
                                            {message}
                                        </div>
                                    )}

                                    <button
                                        onClick={handleBook}
                                        disabled={!selected || booking}
                                        className={`w-full rounded-3xl px-6 py-4 text-sm font-semibold text-white transition ${selected ? 'bg-cinemaRed hover:bg-[#c40c14]' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}
                                    >
                                        {booking ? 'Processing...' : selected ? 'Confirm booking' : 'Select a seat first'}
                                    </button>
                                    <button
                                        onClick={() => navigate('/my-bookings')}
                                        className="w-full rounded-3xl border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                                    >
                                        View my bookings
                                    </button>
                                </div>
                            </aside>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default Seats;
