package com.furrybook.springmongo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.furrybook.springmongo.model.StandardUser;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.repository.UserRepository;

import main.java.com.furrybook.springmongo.model.User.AdminUser;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    public User addUser(StandardUser user) {
        // user.setId(UUID.randomUUID().toString().split("-")[0]);
        return repository.save(user);
    }

    public User addAdminUser(AdminUser user) {
        return repository.save(user);
    }

    public List<User> findAllUsers() {
        return repository.findAll();
    }

    public List<User> findAllStUsers() {
        return repository.findAllByType("standard");
    }

    public List<User> findAllExcludingPassword() {
        return repository.findAllExcludingPassword();
    }

    public List<User> findAllAdmin() {
        return repository.findAllByType("admin");
    }

    public User getUserbyId(String Id) {
        return repository.findById(Id).get();
    }

    public User updateUser(StandardUser userRequest) {
        User existingUser = repository.findById(userRequest.getId()).get();
        existingUser.setName(userRequest.getName());
        existingUser.setEmail(userRequest.getEmail());
        existingUser.setPassword(userRequest.getPassword());
        return repository.save(existingUser);
    }

    public String deleteUser(String Id) {
        repository.deleteById(Id);
        return "User " + Id + " deleted.";
    }
}
