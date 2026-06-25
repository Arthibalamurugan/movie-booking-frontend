import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [genre, setGenre] = useState('');

    const navigate = useNavigate();

    const fetchMovies = async (searchVal, genreVal) => {
        setLoading(true);

        try {
            const params = {};

            if (searchVal?.trim()) {
                params.title = searchVal.trim();
            }

            if (genreVal?.trim()) {
                params.genre = genreVal.trim();
            }

            const response = await API.get('/movies', {
                params
            });

            setMovies(response.data?.data?.content || []);

        } catch (error) {

            console.error('Failed to fetch movies:', error);
            setMovies([]);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovies('', '');
    }, []);

    const handleSearch = () => {
        fetchMovies(search, genre);
    };

    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        setGenre(selectedGenre);
        fetchMovies(search, selectedGenre);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchMovies(search, genre);
        }
    };

    return (
        <div className="space-y-10 pb-10">

            {/* HERO BANNER */}
            {movies.length > 0 && (
                <section className="hero-panel relative overflow-hidden shadow-glow">

                    {movies[0]?.posterUrl && (
                        <img
                            src={movies[0].posterUrl}
                            alt={movies[0].title}
                            className="absolute inset-0 h-full w-full object-cover opacity-30"
                        />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

                    <div className="relative z-10 p-8 sm:p-10">

                        <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">
                            Now Showing
                        </p>

                        <h1 className="max-w-3xl text-5xl font-bold text-white md:text-7xl">
                            {movies[0]?.title}
                        </h1>

                        <p className="mt-4 text-lg text-slate-300">
                            {movies[0]?.genre} • {movies[0]?.durationMins} mins
                        </p>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300">
                            {movies[0]?.description ||
                                'Experience the latest blockbuster in premium theatres.'}
                        </p>

                        <button
                            className="glass-button-primary mt-6"
                            onClick={() =>
                                navigate(`/shows/${movies[0]?.id}`)
                            }
                        >
                            Book Tickets
                        </button>

                    </div>

                </section>
            )}

            {/* SEARCH PANEL */}
            <section className="glass-panel rounded-[24px] border border-white/10 p-6 shadow-soft">

                <div className="mb-6">
                    <p className="text-sm uppercase tracking-[0.35em] text-cinemaGold/80">
                        Search & Filter
                    </p>

                    <h2 className="mt-2 text-2xl font-semibold text-white">
                        Find Your Next Movie
                    </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-4">

                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none"
                    />

                    <select
                        value={genre}
                        onChange={handleGenreChange}
                        className="rounded-3xl border border-white/10 bg-slate-900/85 px-4 py-3 text-white outline-none"
                    >
                        <option value="">All Genres</option>
                        <option value="Action">Action</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Drama">Drama</option>
                        <option value="Comedy">Comedy</option>
                    </select>

                    <button
                        className="rounded-3xl bg-gradient-to-r from-cinemaRed to-cinemaGold px-4 py-3 text-sm font-semibold text-white"
                        onClick={handleSearch}
                    >
                        Search
                    </button>

                    <button
                        className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white"
                        onClick={() => {
                            setSearch('');
                            setGenre('');
                            fetchMovies('', '');
                        }}
                    >
                        Clear
                    </button>

                </div>

            </section>

            {/* MOVIES GRID */}
            {loading ? (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="glass-panel h-[500px] animate-pulse rounded-[28px]"
                        />
                    ))}
                </div>

            ) : movies.length === 0 ? (

                <div className="glass-panel rounded-[24px] border border-white/10 p-10 text-center">

                    <p className="text-xl font-semibold text-white">
                        No Movies Found
                    </p>

                    <p className="mt-2 text-slate-400">
                        Try another search.
                    </p>

                </div>

            ) : (

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {movies.map((movie) => (

                        <article
                            key={movie.id}
                            className="group overflow-hidden rounded-[28px] border border-white/10 bg-slate-950/80 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
                        >

                            <div className="relative overflow-hidden">

                                {movie.posterUrl ? (

                                    <img
                                        src={movie.posterUrl}
                                        alt={movie.title}
                                        className="h-[330px] w-full object-cover transition duration-500 group-hover:scale-105"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                        }}
                                    />

                                ) : (

                                    <div className="flex h-[330px] items-center justify-center bg-slate-900 text-7xl">
                                        🎬
                                    </div>

                                )}

                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent px-6 py-5">

                                    <h3 className="text-2xl font-semibold text-white">
                                        {movie.title}
                                    </h3>

                                </div>

                            </div>

                            <div className="space-y-4 px-6 py-6">

                                <div className="flex flex-wrap gap-2 text-sm text-slate-400">

                                    <span className="rounded-full bg-white/5 px-3 py-1">
                                        {movie.genre}
                                    </span>

                                    <span className="rounded-full bg-white/5 px-3 py-1">
                                        {movie.language}
                                    </span>

                                    <span className="rounded-full bg-white/5 px-3 py-1">
                                        {movie.durationMins} mins
                                    </span>

                                </div>

                                <p className="min-h-[70px] text-sm leading-6 text-slate-300">
                                    {movie.description ||
                                        'A cinematic experience awaiting your booking.'}
                                </p>

                                <div className="flex items-center justify-between">

                                    <div>

                                        <p className="text-sm text-slate-400">
                                            Starting From
                                        </p>

                                        <p className="text-xl font-semibold text-white">
                                            ₹{movie.price}
                                        </p>

                                    </div>

                                    <button
                                        className="rounded-full bg-cinemaRed px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c40c14]"
                                        onClick={() =>
                                            navigate(`/shows/${movie.id}`)
                                        }
                                    >
                                        Book Now
                                    </button>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            )}

        </div>
    );
};

export default Movies;