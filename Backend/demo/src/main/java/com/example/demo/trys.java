package com.example.demo;

import com.example.demo.Factory.User;
import com.example.demo.Factory.UserFactory;

public class trys {
    public static void main(String[] args) {
        UserFactory factory = new UserFactory();
        User a = factory.createUser("standard");
        a.register();
    }
}
