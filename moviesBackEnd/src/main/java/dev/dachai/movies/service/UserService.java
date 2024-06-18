package dev.dachai.movies.service;



import dev.dachai.movies.model.User;
import dev.dachai.movies.repository.UserRepository;
import dev.dachai.movies.util.JwtTokenUtil;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import static com.sun.org.apache.xalan.internal.xsltc.compiler.util.Util.println;

@Service

public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    public List<User> allUsers(){
        return userRepository.findAll();
    }
    public Optional<User> getUserById(ObjectId id){
        return  userRepository.findById(id);
    }
    public Optional<User> findUserByEmail(String email){
        return userRepository.findUserByEmail(email);
    }
    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    public boolean emailExist(String email) {
        return userRepository.findUserByEmail(email).isPresent();
    }
    public String authenticate (User user){
        Optional<User> userOpt  = userRepository.findUserByEmail(user.getEmail());
        if(userOpt.isPresent()){
            User foundUser = userOpt.get();
            if(passwordEncoder.matches(user.getPassword(), foundUser.getPassword())){

                return jwtTokenUtil.generateToken(foundUser);
            }
        }
        return null;
    }


}
