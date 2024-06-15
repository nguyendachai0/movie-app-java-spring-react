package dev.dachai.movies.service;


import com.github.javafaker.Faker;
import dev.dachai.movies.model.User;
import dev.dachai.movies.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;
    public List<User> allUsers(){
        return userRepository.findAll();
    }
    public Optional<User> getUserById(ObjectId id){
        return  userRepository.findById(id);
    }
    private final Faker faker = new Faker();

    @PostConstruct
    public void generateDummyData() {
        List<User> users = new ArrayList<>();

        for (int i = 0; i < 100; i++) {
            User user = new User();
            user.setUsername(faker.name().username());
            user.setEmail(faker.internet().emailAddress());
            user.setAddress(faker.address().fullAddress());
            users.add(user);
        }
    }

}
