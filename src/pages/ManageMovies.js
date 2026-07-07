import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const ManageMovies = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [search, setSearch] = useState('');

    const fetchMovies = async () => {
        try {
            const res = await API.get('/movies');
            setMovies(res.data.data.content || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const deleteMovie = async (id) => {
        if (!window.confirm('Delete this movie permanently?')) return;
        try {
            await API.delete(`/movies/${id}`);
            setMessage('✅ Movie deleted successfully');
            fetchMovies();
        } catch (error) {
            setMessage(error.response?.data?.message || 'Delete failed');
        }
    };

    const filtered = movies.filter((m) => m.title?.toLowerCase().includes(search.toLowerCase()));

    return (
        <div className="space-y-8 pb-10">
            <div className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Manage movies</p>
                        <h1 className="mt-4 text-4xl font-semibold text-white">Cinema catalogue control</h1>
                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Edit, delete, and search movies in your premium catalogue.</p>
                    </div>
                    <button
                        onClick={() => navigate('/admin/add-movie')}
                        className="rounded-full bg-cinemaRed px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c40c14]"
                    >
                        + Add movie
                    </button>
                </div>
            </div>

            {message && (
                <div className="glass-panel rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-100 shadow-soft">{message}</div>
            )}

            <div className="glass-panel rounded-[28px] border border-white/10 p-6 shadow-soft">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="Search movies by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                    />
                </div>

                {loading ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {[...Array(4)].map((_, idx) => (
                            <div key={idx} className="h-48 animate-pulse rounded-3xl bg-white/5" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center text-slate-400">
                        <p className="text-lg font-semibold text-white">No movies found</p>
                        <p className="mt-2 text-sm">Try searching with different keywords.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filtered.map((movie) => (
                            <article key={movie.id} className="flex items-center justify-between gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 transition hover:bg-slate-900">
                                <div className="flex gap-6">
                                    {movie.posterUrl && (
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            className="h-24 w-20 rounded-2xl object-cover"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/80x120?text=No+Poster';
                                            }}
                                        />
                                    )}
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-white">{movie.title}</h3>
                                        <p className="text-sm text-slate-400">{movie.genre} • {movie.language} • ₹{movie.price}</p>
                                        <p className="text-sm text-slate-500">{movie.durationMins} mins • {movie.city}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => navigate(`/admin/edit-movie/${movie.id}`)}
                                        className="rounded-full border border-cinemaBlue/30 bg-cinemaBlue/10 px-5 py-2 text-sm font-semibold text-cinemaBlue transition hover:bg-cinemaBlue/20"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteMovie(movie.id)}
                                        className="rounded-full border border-red-500/30 bg-red-500/10 px-5 py-2 text-sm font-semibold text-red-300 transition hover:bg-red-500/20"
                                    >
                                        Delete
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

export default ManageMovies;
