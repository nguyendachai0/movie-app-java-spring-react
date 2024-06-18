// components/admin/MovieAdmin.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure axios is imported
import { useParams, useNavigate } from 'react-router-dom';
const MovieAdmin = () => {
    const {id} =  useParams();
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

    useEffect(()=>{
        if(id) {
            axios.get(`http://localhost:8080/api/v1/movies/${id}`)
            .then((response)=> {
                const movie = response.data;
                setNewMovieData({
                    imdbId: movie.imdbId,
                    title : movie.title,
                    releaseDate: movie.releaseDate,
                    trailerLink: movie.trailerLink,
                    poster: movie.poster,
                    genres: movie.genres.join(','),
                    backdrops: movie.backdrops.join(','),
                });
            })
            .catch((error) => {
                console.error('Error fetching movie:', error);
                alert('Failed to fetch movie data. Check console for details.')
            })
        }

    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMovieData({
            ...newMovieData,
            [name]: value
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
            if(id){
                await axios.put(`http://localhost:8080/api/v1/movies/${id}`, preparedData);
                alert('Movie updated successfully!');
            }else{
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

    const handleDelete =async () =>{
        if(!id) return;
        try {
            await axios.delete(`http://localhost:8080/api/v1/movies/${id}`);
            alert(`Movie deleted successfully.`);
            navigate('/admin');
        }catch(error){
            console.error('Error deleting movie: ',error);
            alert('Failed to delete movie. Check console for details.');
        }
    }

    return (
        <div>
            <h2>{id ? 'Edit Movie' : 'Add New Movie'}</h2>
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
                <button type="submit">{id ? 'Update' : 'Add'}</button>
                {id && <button type="button" onClick={handleDelete}>Delete</button>}
            </form>
        </div>
    );
};

export default MovieAdmin;
