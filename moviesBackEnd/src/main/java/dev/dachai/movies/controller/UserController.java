package dev.dachai.movies.controller;

import dev.dachai.movies.service.UserService;
import dev.dachai.movies.webtoken.JwtService;
import dev.dachai.movies.webtoken.LoginForm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping()
@CrossOrigin("/*")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

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
    @PostMapping("/authenticate")
    public String authenticateAndGetToken(@RequestBody LoginForm loginForm){
      Authentication authentication =  authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginForm.email(), loginForm.password()
        ));
        if(authentication.isAuthenticated()){
          return  jwtService.generateToken(userService.loadUserByUsername(loginForm.email()));
        }else{
            throw new UsernameNotFoundException("Invalid credentials");
        }
    }

    }




