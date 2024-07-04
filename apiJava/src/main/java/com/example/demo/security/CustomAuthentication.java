package com.example.demo.security;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import java.util.Collections;

public class CustomAuthentication extends AbstractAuthenticationToken {
    private final String token;

    public CustomAuthentication(String token) {
        super(Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        this.token = token;
        setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return token;
    }

    @Override
    public Object getPrincipal() {
        return token;
    }
}