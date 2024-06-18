package dev.dachai.movies.controller;

import dev.dachai.movies.model.User;
import dev.dachai.movies.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping()
@CrossOrigin("/*")
public class UserController {
    @Autowired
    private UserService userService;
    @PostMapping("/register")
        public ResponseEntity<String> registerUser(@RequestBody User user){
        try{
            if(userService.emailExist(user.getEmail())){
                return ResponseEntity.status(HttpStatus.CONFLICT).body("There is a user have already used this email to register");
            }else{
                userService.createUser(user);
                return ResponseEntity.status(HttpStatus.CREATED).body("You registered successfully");
            }
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while registering the user.");
        }
    }
    @PostMapping("/loginn")
    public ResponseEntity<String> loginUser(@RequestBody User user){
        try {
            String token = userService.authenticate(user);

            if(token != null){
                return ResponseEntity.ok(token);
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid  email or password");
            }

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while login");
        }
    }



}
