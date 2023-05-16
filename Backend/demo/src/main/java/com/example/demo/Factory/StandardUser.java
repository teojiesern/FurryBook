package com.example.demo.Factory;

public class StandardUser implements User {

    @Override
    public void register() {
        System.out.println("standard user registering...");
    }

    @Override
    public void login() {
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    @Override
    public void updateProfile() {
        throw new UnsupportedOperationException("Unimplemented method 'updateProfile'");
    }
    
}
