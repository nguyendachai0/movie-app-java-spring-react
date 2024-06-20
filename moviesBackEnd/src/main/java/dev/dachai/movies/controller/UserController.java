package dev.dachai.movies.controller;

import dev.dachai.movies.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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




