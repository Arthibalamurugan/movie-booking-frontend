import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const AddMovie = () => {
    const navigate = useNavigate();
    const [movie, setMovie] = useState({ title: '', genre: '', durationMins: '', price: '', language: '', city: '', releaseDate: '', description: '', posterUrl: '' });
    const [message, setMessage] = useState('');
    const [uploading, setUploading] = useState(false);

    const handleChange = (e) => setMovie({ ...movie, [e.target.name]: e.target.value });

    const handlePosterUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);

        try {
            setUploading(true);
            const res = await API.post('/admin/upload/poster', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            setMovie((prev) => ({ ...prev, posterUrl: res.data.data }));
            setMessage('✅ Poster uploaded successfully');
        } catch (error) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Poster upload failed');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/movies', { ...movie, durationMins: Number(movie.durationMins), price: Number(movie.price) });
            setMessage('✅ Movie added successfully');
            setTimeout(() => navigate('/admin/manage-movies'), 1500);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to add movie');
        }
    };

    return (
        <div className="space-y-8 pb-10">
            <div className="hero-panel overflow-hidden p-8 shadow-glow sm:p-10">
                <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Movie studio</p>
                <h1 className="mt-4 text-4xl font-semibold text-white">Add a new movie to your catalogue</h1>
                <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">Use this form to publish new titles, configure ticket pricing and manage theatre-ready movie metadata.</p>
            </div>

            {message && (
                <div className="glass-panel rounded-[28px] border border-white/10 bg-slate-900/80 p-5 text-sm text-slate-100 shadow-soft">{message}</div>
            )}

            <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[0.9fr_0.6fr]">
                <div className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
                    <div className="grid gap-5 sm:grid-cols-2">
                        {['title', 'genre', 'language', 'city'].map((field) => (
                            <label key={field} className="block text-sm text-slate-300">
                                {field === 'title' ? 'Movie title' : field.charAt(0).toUpperCase() + field.slice(1)}
                                <input
                                    name={field}
                                    value={movie[field]}
                                    onChange={handleChange}
                                    required
                                    className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                                />
                            </label>
                        ))}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <label className="block text-sm text-slate-300">
                            Duration (mins)
                            <input
                                type="number"
                                name="durationMins"
                                value={movie.durationMins}
                                onChange={handleChange}
                                required
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                        <label className="block text-sm text-slate-300">
                            Ticket price
                            <input
                                type="number"
                                name="price"
                                value={movie.price}
                                onChange={handleChange}
                                required
                                className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                            />
                        </label>
                    </div>

                    <label className="block text-sm text-slate-300">
                        Release date
                        <input
                            type="date"
                            name="releaseDate"
                            value={movie.releaseDate}
                            onChange={handleChange}
                            required
                            className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                        />
                    </label>

                    <label className="block text-sm text-slate-300">
                        Description
                        <textarea
                            name="description"
                            rows="5"
                            value={movie.description}
                            onChange={handleChange}
                            className="mt-3 w-full rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none transition focus:border-cinemaRed focus:ring-2 focus:ring-cinemaRed/15"
                        />
                    </label>
                </div>

                <aside className="space-y-6 rounded-[28px] border border-white/10 bg-slate-950/80 p-8 shadow-soft">
                    <div>
                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">Poster upload</p>
                        <p className="mt-3 text-sm text-slate-400">Drag and drop your movie poster or select a file.</p>
                    </div>
                    <label className="relative block cursor-pointer rounded-[28px] border border-dashed border-white/10 bg-slate-900/85 p-8 text-center text-slate-400 transition hover:border-cinemaRed hover:text-white">
                        <input type="file" accept="image/*" className="sr-only" onChange={handlePosterUpload} />
                        <p className="text-sm font-semibold">Upload poster</p>
                        <p className="mt-2 text-xs text-slate-500">PNG, JPG, GIF up to 5MB</p>
                    </label>
                    {uploading && <p className="text-sm text-cinemaGold">Uploading poster...</p>}
                    {movie.posterUrl && (
                        <div className="rounded-[28px] overflow-hidden border border-white/10 bg-slate-900/80">
                            <img src={movie.posterUrl} alt="Poster preview" className="h-80 w-full object-cover" />
                        </div>
                    )}
                    <button type="submit" className="glass-button-primary w-full">Save movie</button>
                </aside>
            </form>
        </div>
    );
};

export default AddMovie;
