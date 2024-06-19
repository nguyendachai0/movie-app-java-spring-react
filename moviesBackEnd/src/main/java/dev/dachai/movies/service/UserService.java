package dev.dachai.movies.service;



import dev.dachai.movies.model.User;
import dev.dachai.movies.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;



@Service

public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<User>  user  =  userRepository.findUserByUsername(username);
        if(user.isPresent()){
            var userObj  =  user.get();
           return User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(userObj.getRole())
                    .build();
        }else{
            throw new UsernameNotFoundException();
        }

    }
    private String[] getRoles(MyUser user){
        if(user.getRole()  ==  null){
            return  new  String[]
        }
    }



}
