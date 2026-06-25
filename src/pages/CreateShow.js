import React, { useEffect, useState } from 'react';
import API from '../api/axios';

const CreateShow = () => {
    const [movies, setMovies] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState({ movieId: '', theaterName: '', showTime: '', totalSeats: '' });

    useEffect(() => {
        API.get('/movies')
            .then((res) => {
                setMovies(res.data.data.content || []);
            })
            .catch(console.error);
    }, []);

    const handleChange = (e) => {
        setShow({
            ...show,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await API.post('/admin/shows', {
                movieId: Number(show.movieId),
                theaterName: show.theaterName,
                showTime: show.showTime,
                totalSeats: Number(show.totalSeats)
            });

            setMessage('✅ Show created successfully');

            setShow({
                movieId: '',
                theaterName: '',
                showTime: '',
                totalSeats: ''
            });
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to create show');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Create show</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Schedule a new cinema showing</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Configure movie, theatre, time and seat capacity for a premium showtime experience.</p>
            </div>

            {message && (
                <div className="glass-panel rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-100 shadow-soft">{message}</div>
            )}

            <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
                <label className="block text-sm text-slate-300">
                    Select movie
                    <select
                        name="movieId"
                        value={show.movieId}
                        onChange={handleChange}
                        required
                        className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                    >
                        <option value="">-- Choose a movie --</option>
                        {movies.map((movie) => (
                            <option key={movie.id} value={movie.id}>
                                {movie.title}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block text-sm text-slate-300">
                    Theatre name
                    <input
                        type="text"
                        name="theaterName"
                        value={show.theaterName}
                        onChange={handleChange}
                        placeholder="e.g., IMAX Screen 1, Grand Hall"
                        required
                        className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                    />
                </label>

                <label className="block text-sm text-slate-300">
                    Show date & time
                    <input
                        type="datetime-local"
                        name="showTime"
                        value={show.showTime}
                        onChange={handleChange}
                        required
                        className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                    />
                </label>

                <label className="block text-sm text-slate-300">
                    Total seats
                    <input
                        type="number"
                        name="totalSeats"
                        value={show.totalSeats}
                        onChange={handleChange}
                        placeholder="e.g., 150"
                        required
                        className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                    />
                </label>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-3xl bg-gradient-to-r from-cinemaRed to-cinemaGold px-6 py-4 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? 'Creating show...' : 'Create show'}
                </button>
            </form>
        </div>
    );
};

export default CreateShow;
