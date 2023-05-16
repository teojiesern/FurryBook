package com.example.demo.Factory;

public class UserFactory {
    public User createUser(String userType){
        if(userType.equalsIgnoreCase("standard")){
            return new StandardUser();
        }else if(userType.equalsIgnoreCase("admin")){
            return new AdminUser();
        }else{
            throw new IllegalArgumentException("Invalid user type: " + userType);
        }
    }
}
