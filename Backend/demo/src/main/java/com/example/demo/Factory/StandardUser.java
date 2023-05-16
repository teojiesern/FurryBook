package com.example.demo.Factory;

public class StandardUser implements User {
    private String name, email, password, gender;
    private int age;

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
        System.out.println("standard user registering...");
        System.out.println("email: " + email);
        System.out.println("password: " + password);
        System.out.println("gender: " + gender);
        System.out.println("name: " + name);
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
