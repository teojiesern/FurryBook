package com.example.demo.Factory;

import org.springframework.data.mongodb.core.mapping.Field;
import org.springframework.data.annotation.Id;

public class AdminUser implements User {
    @Id
    private String Id;
    private String name, email, password, gender;
    private int age;

    @Field("userType")
    private final String userType = "admin";
    
    @Override
    public String getId() {
        return Id;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    @Override
    public void register(String email, String password, String gender, String name) {
        System.out.println("admin user registering...");
    }

    @Override
    public void login(String email, String password) {
        throw new UnsupportedOperationException("Unimplemented method 'login'");
    }

    @Override
    public void updateProfile() {
        throw new UnsupportedOperationException("Unimplemented method 'updateProfile'");
    }
    
}
