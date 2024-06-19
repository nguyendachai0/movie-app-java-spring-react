package dev.dachai.movies.repository;

import dev.dachai.movies.model.Movie;
import dev.dachai.movies.model.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, ObjectId>{
    Optional<User> findUserByEmail(String email);
    Optional<User> findUserByUsername(String username);
}