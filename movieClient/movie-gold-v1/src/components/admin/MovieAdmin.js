// src/components/admin/MovieAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieAdmin.css'; // Ensure you create a corresponding CSS file for styling

const MovieAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newMovieData, setNewMovieData] = useState({
    imdbId: '',
    title: '',
    releaseDate: '',
    trailerLink: '',
    poster: '',
    genres: '',
    backdrops: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/v1/movies/${id}`)
        .then((response) => {
          const movie = response.data;
          setNewMovieData({
            imdbId: movie.imdbId,
            title: movie.title,
            releaseDate: movie.releaseDate,
            trailerLink: movie.trailerLink,
            poster: movie.poster,
            genres: movie.genres.join(','),
            backdrops: movie.backdrops.join(','),
          });
        })
        .catch((error) => {
          console.error('Error fetching movie:', error);
          alert('Failed to fetch movie data. Check console for details.');
        });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovieData({
      ...newMovieData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedData = {
      ...newMovieData,
      genres: newMovieData.genres.split(',').map((genre) => genre.trim()),
      backdrops: newMovieData.backdrops.split(',').map((backdrop) => backdrop.trim()),
    };

    try {
      if (id) {
        await axios.put(`http://localhost:8080/api/v1/movies/${id}`, preparedData);
        alert('Movie updated successfully!');
      } else {
        await axios.post('http://localhost:8080/api/v1/movies', preparedData);
        alert('Movie added successfully!');
      }
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

  const handleDelete = async () => {
    if (!id) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/movies/${id}`);
      alert('Movie deleted successfully.');
      navigate('/admin');
    } catch (error) {
      console.error('Error deleting movie:', error);
      alert('Failed to delete movie. Check console for details.');
    }
  };

  return (
    <div className="movie-admin-container">
    <div className="form-container">
      <h2>{id ? 'Edit Movie' : 'Add New Movie'}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imdbId">IMDB ID</label>
          <input
            type="text"
            id="imdbId"
            name="imdbId"
            value={newMovieData.imdbId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newMovieData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="releaseDate">Release Date</label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={newMovieData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="trailerLink">Trailer Link</label>
          <input
            type="url"
            id="trailerLink"
            name="trailerLink"
            value={newMovieData.trailerLink}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="poster">Poster URL</label>
          <input
            type="url"
            id="poster"
            name="poster"
            value={newMovieData.poster}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="genres">Genres (comma-separated)</label>
          <input
            type="text"
            id="genres"
            name="genres"
            value={newMovieData.genres}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="backdrops">Backdrops (comma-separated)</label>
          <input
            type="text"
            id="backdrops"
            name="backdrops"
            value={newMovieData.backdrops}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="form-submit-btn">{id ? 'Update' : 'Add'}</button>
        {id && <button type="button" className="form-delete-btn" onClick={handleDelete}>Delete</button>}
      </form>
    </div>
    </div>
  );
};

export default MovieAdmin;
