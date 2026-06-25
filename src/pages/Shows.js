import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Shows = () => {
    const { movieId } = useParams();
    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [language, setLanguage] = useState('');
    const [format, setFormat] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const navigate = useNavigate();

    const fetchShows = async () => {
        setLoading(true);
        try {
            const response = await API.get(`/shows/movie/${movieId}`);
            setShows(response.data?.data || []);
        } catch (error) {
            console.error('Failed to fetch shows:', error);
            setShows([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchShows();
    }, [movieId]);

    const filteredShows = shows.filter((show) => {
        const matchesSearch = search
            ? show.theaterName?.toLowerCase().includes(search.toLowerCase())
            : true;
        const matchesLanguage = language
            ? show.language === language
            : true;
        const matchesFormat = format
            ? show.format === format
            : true;
        const matchesDate = selectedDate
            ? new Date(show.showTime).toISOString().slice(0, 10) === selectedDate
            : true;
        return matchesSearch && matchesLanguage && matchesFormat && matchesDate;
    });

    const movieTitle = shows[0]?.movieTitle || 'Movie';

    return (
        <div className="space-y-8 pb-10">
            <div className="glass-panel rounded-[28px] border border-white/10 p-8 shadow-glow sm:p-10">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Showing now</p>
                        <h1 className="mt-4 text-4xl font-semibold text-white md:text-5xl">Select your theatre & showtime for {movieTitle}</h1>
                        <p className="mt-4 text-base leading-7 text-slate-300">Pick the best seat, compare theatre formats, and book instantly with a slick cinematic UI.</p>
                    </div>
                    <button
                        onClick={() => navigate('/movies')}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                        ← Back to movies
                    </button>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="glass-card p-6">
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Available theatres</p>
                        <p className="mt-3 text-3xl font-semibold text-white">{filteredShows.length}</p>
                    </div>
                    <div className="glass-card p-6">
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Language</p>
                        <p className="mt-3 text-lg text-slate-300">{language || 'All'}</p>
                    </div>
                    <div className="glass-card p-6">
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Format</p>
                        <p className="mt-3 text-lg text-slate-300">{format || 'Any'}</p>
                    </div>
                    <div className="glass-card p-6">
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Date</p>
                        <p className="mt-3 text-lg text-slate-300">{selectedDate || 'Today & upcoming'}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <aside className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Refine your search</p>
                            <h2 className="mt-3 text-2xl font-semibold text-white">Find the best showtime</h2>
                        </div>
                        <div className="space-y-5">
                            <label className="block text-sm text-slate-300">
                                Search theatre
                                <input
                                    type="text"
                                    placeholder="Search by theatre name"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                                />
                            </label>

                            <label className="block text-sm text-slate-300">
                                Select language
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                                >
                                    <option value="">All Languages</option>
                                    {Array.from(new Set(shows.map((item) => item.language).filter(Boolean))).map((lang) => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="block text-sm text-slate-300">
                                Format
                                <select
                                    value={format}
                                    onChange={(e) => setFormat(e.target.value)}
                                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                                >
                                    <option value="">All Formats</option>
                                    {['2D', '3D', 'IMAX'].map((value) => (
                                        <option key={value} value={value}>{value}</option>
                                    ))}
                                </select>
                            </label>

                            <label className="block text-sm text-slate-300">
                                Select date
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                                />
                            </label>
                        </div>
                    </div>
                </aside>

                <main className="space-y-6">
                    {loading ? (
                        <div className="grid gap-4">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="glass-panel animate-pulse rounded-[28px] p-6 h-56" />
                            ))}
                        </div>
                    ) : filteredShows.length === 0 ? (
                        <div className="glass-panel rounded-[28px] border border-white/10 p-10 text-center text-slate-300 shadow-soft">
                            <h3 className="text-2xl font-semibold text-white">No theatre matches</h3>
                            <p className="mt-3 text-sm text-slate-400">Try removing filters or changing the date to find available shows.</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredShows.map((show) => {
                                const showDate = new Date(show.showTime);
                                const occupancy = ((show.totalSeats - show.availableSeats) / show.totalSeats) * 100;

                                return (
                                    <article key={show.id} className="glass-panel overflow-hidden rounded-[28px] border border-white/10 shadow-soft transition hover:-translate-y-1 hover:shadow-glow">
                                        <div className="grid gap-6 lg:grid-cols-[0.7fr_0.45fr]">
                                            <div className="space-y-5 p-6">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">{show.theaterName}</p>
                                                        <h3 className="mt-2 text-2xl font-semibold text-white">{show.format || 'Standard'} Experience</h3>
                                                    </div>
                                                    <span className="rounded-full bg-slate-900/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">{show.language || 'Language'}</span>
                                                </div>

                                                <div className="grid gap-3 sm:grid-cols-3">
                                                    <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                                                        <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Date</span>
                                                        <p className="mt-2 text-lg font-semibold text-white">{showDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}</p>
                                                    </div>
                                                    <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                                                        <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Seats left</span>
                                                        <p className="mt-2 text-lg font-semibold text-white">{show.availableSeats}/{show.totalSeats}</p>
                                                    </div>
                                                    <div className="rounded-3xl bg-white/5 p-4 text-sm text-slate-300">
                                                        <span className="text-xs uppercase tracking-[0.35em] text-slate-400">Occupancy</span>
                                                        <p className="mt-2 text-lg font-semibold text-white">{occupancy.toFixed(0)}%</p>
                                                    </div>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    {show.timings?.split(',').map((time) => (
                                                        <span key={time} className="rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200">{time.trim()}</span>
                                                    ))}
                                                </div>

                                                <p className="text-sm leading-7 text-slate-300">Theatre seating and pricing vary by location. Select a showtime to continue with an immersive booking flow.</p>
                                            </div>

                                            <div className="flex flex-col justify-between gap-6 border-l border-white/10 p-6">
                                                <div>
                                                    <div className="mb-4 rounded-3xl bg-slate-900/70 p-5 text-sm text-slate-300">
                                                        <p className="uppercase tracking-[0.35em] text-slate-400">Show time</p>
                                                        <p className="mt-3 text-3xl font-semibold text-white">{showDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </div>
                                                    <div className="rounded-3xl bg-slate-900/70 p-5 text-sm text-slate-300">
                                                        <p className="uppercase tracking-[0.35em] text-slate-400">Price</p>
                                                        <p className="mt-3 text-3xl font-semibold text-white">₹{show.price ?? 0}</p>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => navigate(`/seats/${show.id}`)}
                                                    className={`w-full rounded-3xl px-5 py-4 text-sm font-semibold text-white transition ${show.availableSeats > 0 ? 'bg-cinemaRed hover:bg-[#c40c14]' : 'cursor-not-allowed bg-slate-800 text-slate-400'}`}
                                                    disabled={show.availableSeats === 0}
                                                >
                                                    {show.availableSeats > 0 ? 'Select Seats' : 'Sold out'}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Shows;
