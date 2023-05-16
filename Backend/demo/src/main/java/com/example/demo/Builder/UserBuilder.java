package com.example.demo.Builder;

import org.springframework.boot.autoconfigure.security.SecurityProperties.User;

import com.example.demo.Factory.AdminUser;
import com.example.demo.Factory.StandardUser;

public class UserBuilder {
    private String email, username, password;

    public UserBuilder setEmail(String email){
        this.email = email;
        return this;
    }

    public UserBuilder setUsername(String username){
        this.username = username;
        return this;
    }

    public UserBuilder setPassword(String password){
        this.password = password;
        return this;
    }

}
