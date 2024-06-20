package dev.dachai.movies.service;



import dev.dachai.movies.model.User;
import dev.dachai.movies.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.stereotype.Service;

import java.util.Optional;



@Service

public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        Optional<User>  user  =  userRepository.findUserByEmail(email);
        if(user.isPresent()){
            var userObj  =  user.get();
           return  org.springframework.security.core.userdetails.User.builder()
                    .username(userObj.getUsername())
                    .password(userObj.getPassword())
                    .roles(userObj.getRole())
                    .build();
        }else{
            throw new UsernameNotFoundException(email);
        }

    }
    private String[] getRoles(User user){
        if(user.getRole()  ==  null){
            return new String[]{"User"};
        }
        return user.getRole().split(",");
    }



}
