package com.example.demo.Builder;

public class UserBuilder {
    private Integer id;

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
