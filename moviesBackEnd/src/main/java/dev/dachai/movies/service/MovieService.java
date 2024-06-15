package dev.dachai.movies.service;

import dev.dachai.movies.model.Movie;
import dev.dachai.movies.repository.MovieRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> allMovies(){
        return movieRepository.findAll();
    }
    public Optional<Movie> getMovieByImdbId(String imdbId){
        return movieRepository.findMovieByImdbId(imdbId);
    }
    public Optional<Movie> getMovieById(ObjectId id){
        return movieRepository.findById(id);
    }
    public Optional<Movie> getMovieByTitle(String title){
        return movieRepository.findMovieByTitle(title);
    }
    public Movie createMovie(Movie movie){
        return movieRepository.save(movie);
    }
    public ResponseEntity<Movie> updateMovie(ObjectId id, Movie movieDetails){
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if(optionalMovie.isPresent()){
            Movie movie =  optionalMovie.get();
            movie.setImdbId(movieDetails.getImdbId());
            movie.setTitle(movieDetails.getTitle());
            movie.setReleaseDate(movieDetails.getReleaseDate());
            movie.setTrailerLink(movieDetails.getTrailerLink());
            movie.setPoster(movieDetails.getPoster());
            movie.setGenres(movieDetails.getGenres());
            movie.setBackdrops(movieDetails.getBackdrops());
            movie.setReviewId(movieDetails.getReviewId());
            return ResponseEntity.ok(movieRepository.save(movie));
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    public ResponseEntity<Void> deleteMovie(ObjectId id){
        Optional<Movie> optionalMovie = movieRepository.findById(id);
        if (optionalMovie.isPresent()){
            movieRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    public List<Movie> searchMovies(String keyword) {
        return movieRepository.findByTitleContainingIgnoreCaseOrGenresContainingIgnoreCase(keyword, keyword);
    }

}
