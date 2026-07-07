import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

const EditMovie = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({ title: '', genre: '', language: '', durationMins: '', price: '', city: '', description: '', posterUrl: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        API.get(`/movies/${id}`)
            .then((res) => setMovie(res.data.data))
            .catch(console.error);
    }, [id]);

    const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/movies/${id}`, movie);
            setMessage('✅ Movie updated successfully');
            setTimeout(() => navigate('/admin/manage-movies'), 1300);
        } catch (error) {
            console.error(error);
            setMessage('Update failed');
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Edit movie</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Update movie details</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Maintain your catalogue with cinematic precision and instant admin controls.</p>
            </div>

            {message && (
                <div className="glass-panel rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-100 shadow-soft">{message}</div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[0.9fr_0.6fr]">
                <div className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm text-slate-300">
                            Title
                            <input
                                name="title"
                                value={movie.title}
                                onChange={handleChange}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                        <label className="block text-sm text-slate-300">
                            Genre
                            <input
                                name="genre"
                                value={movie.genre}
                                onChange={handleChange}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm text-slate-300">
                            Language
                            <input
                                name="language"
                                value={movie.language}
                                onChange={handleChange}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                        <label className="block text-sm text-slate-300">
                            Duration
                            <input
                                name="durationMins"
                                type="number"
                                value={movie.durationMins}
                                onChange={handleChange}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm text-slate-300">
                            Price
                            <input
                                name="price"
                                type="number"
                                value={movie.price}
                                onChange={handleChange}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                        <label className="block text-sm text-slate-300">
                            City
                            <input
                                name="city"
                                value={movie.city}
                                onChange={handleChange}
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                    </div>

                    <label className="block text-sm text-slate-300">
                        Poster URL
                        <input
                            name="posterUrl"
                            value={movie.posterUrl}
                            onChange={handleChange}
                            className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                        />
                    </label>

                    <label className="block text-sm text-slate-300">
                        Description
                        <textarea
                            rows="5"
                            name="description"
                            value={movie.description}
                            onChange={handleChange}
                            className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                        />
                    </label>
                </div>

                <aside className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
                    <div className="space-y-2">
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Poster preview</p>
                        {movie.posterUrl ? (
                            <img src={movie.posterUrl} alt="Poster preview" className="rounded-[24px] object-cover" />
                        ) : (
                            <div className="flex h-80 items-center justify-center rounded-[24px] border border-white/10 bg-slate-900/70 text-slate-500">No poster available</div>
                        )}
                    </div>
                    <button type="submit" className="glass-button-primary w-full">Update movie</button>
                </aside>
            </form>
        </div>
    );
};

export default EditMovie;
