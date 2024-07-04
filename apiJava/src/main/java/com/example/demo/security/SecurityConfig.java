package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private CustomTokenFilter customTokenFilter;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors() // Habilita CORS
            .and()
            .csrf().disable()
            .addFilterBefore(customTokenFilter, UsernamePasswordAuthenticationFilter.class)
            .authorizeRequests()
                .antMatchers("/public/**", "/v2/api-docs", "/swagger-resources/**", "/swagger-ui/**", "/webjars/**").permitAll()
                .anyRequest().authenticated();
    }
}