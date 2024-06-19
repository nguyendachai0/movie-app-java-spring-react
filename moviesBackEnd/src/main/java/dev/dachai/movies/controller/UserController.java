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
    @GetMapping
    public String home() {
        return "home page";
    }
    @GetMapping("/admin")
    public String admin(){
        return  "Admin page";
    }
    @GetMapping("/user")
    public  String user(){
        return "User  page";
    }

    }




