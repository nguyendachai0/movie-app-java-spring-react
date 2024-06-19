package dev.dachai.movies.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.config.annotation.web.configurers.AbstractAuthenticationFilterConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity  httpSecurity)throws Exception{
        return httpSecurity.authorizeHttpRequests(registry-> {
                    registry.requestMatchers("/").permitAll();
                    registry.requestMatchers("/admin/**").hasRole("ADMIN");
                    registry.requestMatchers("/user/**").hasRole("USER");
                    registry.anyRequest().authenticated();
                })
                .formLogin(AbstractAuthenticationFilterConfigurer::permitAll)
                .build();


    }
    @Bean
    public UserDetailsService  userDetailsService(){
        UserDetails normalUser = User.builder()
                .username("gc")
                .password("$2y$10$HznytkRwIX.DX6xEhPAO4O3J0Uyv0uloZXFYpekkUoFCMpyUubsRS")
                .roles("USER")
                .build();
        UserDetails adminUser = User.builder()
                .username("admin")
                .password("$2y$10$Iqlm.QivrzVUy2zV1gZEbOrPx87TYnMn2zSk.IXYNqV.kiUYzyaDu")
                .roles("ADMIN","USER")
                .build();
        return new InMemoryUserDetailsManager(normalUser, adminUser);
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
