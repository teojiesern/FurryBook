package com.furrybook.springmongo.controller;

import com.furrybook.springmongo.model.User.AdminUser;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.service.UserService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAdminUsers() {
        return service.findAllAdmin();
    }

    @GetMapping("/usersinfo")
    public List<User> getUsers() {
        return service.findAllUsers();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return service.findUserByEmail(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createAdminUser(@RequestBody AdminUser user) {
        return service.addAdminUser(user);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{Id}")
    public ResponseEntity<String> deleteUser(@PathVariable String Id) {
        String result = service.deleteUser(Id);

        if (result.equals("User not found.")) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(result);
    }

}
