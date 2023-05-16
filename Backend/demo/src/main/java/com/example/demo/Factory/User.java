package com.example.demo.Factory;

public interface User {
    public void register(String email, String password, String gender, String name);
    public void login(String email, String password);
    public void updateProfile();
}
