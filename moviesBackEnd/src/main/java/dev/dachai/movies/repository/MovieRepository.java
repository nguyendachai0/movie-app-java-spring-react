package dev.dachai.movies.repository;

import dev.dachai.movies.model.Movie;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

public interface MovieRepository extends MongoRepository<Movie, ObjectId> {
    Optional<Movie> findMovieByImdbId(String imdbId);
    Optional<Movie> findMovieByTitle(String title);
    List<Movie> findByTitleContainingIgnoreCaseOrGenresContainingIgnoreCase(String title, String genres);

}
