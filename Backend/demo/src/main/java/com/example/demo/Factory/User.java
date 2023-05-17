package com.example.demo.Factory;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public interface User {
    String getId();
    
    public void register(String email, String password, String gender, String name);
    public void login(String email, String password);
    public void updateProfile();
}
