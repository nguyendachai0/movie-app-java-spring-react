// components/admin/MovieAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported

const MovieAdmin = () => {
    const [newMovieData, setNewMovieData] = useState({
        imdbId: '',
        title: '',
        releaseDate: '',
        trailerLink: '',
        poster: '',
        genres: '',
        backdrops: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovieData({
            ...newMovieData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data
        const preparedData = {
            ...newMovieData,
            genres: newMovieData.genres.split(',').map((genre) => genre.trim()),
            backdrops: newMovieData.backdrops.split(',').map((backdrop) => backdrop.trim()),
        };

        try {
            console.log(preparedData);
            await axios.post('http://localhost:8080/api/v1/movies', preparedData);
            alert('Movie added successfully!');
            setNewMovieData({
                imdbId: '',
                title: '',
                releaseDate: '',
                trailerLink: '',
                poster: '',
                genres: '',
                backdrops: '',
            });
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Failed to add movie. Check console for details.');
        }
    };

    return (
        <div>
            <h2>Add New Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    IMDB ID:
                    <input type="text" name="imdbId" value={newMovieData.imdbId} onChange={handleInputChange} required />
                </label>
                <label>
                    Title:
                    <input type="text" name="title" value={newMovieData.title} onChange={handleInputChange} required />
                </label>
                <label>
                    Release Date:
                    <input type="date" name="releaseDate" value={newMovieData.releaseDate} onChange={handleInputChange} required />
                </label>
                <label>
                    Trailer Link:
                    <input type="url" name="trailerLink" value={newMovieData.trailerLink} onChange={handleInputChange} required />
                </label>
                <label>
                    Poster URL:
                    <input type="url" name="poster" value={newMovieData.poster} onChange={handleInputChange} required />
                </label>
                <label>
                    Genres (comma-separated):
                    <input type="text" name="genres" value={newMovieData.genres} onChange={handleInputChange} required />
                </label>
                <label>
                    Backdrops (comma-separated):
                    <input type="text" name="backdrops" value={newMovieData.backdrops} onChange={handleInputChange} required />
                </label>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
};

export default MovieAdmin;
