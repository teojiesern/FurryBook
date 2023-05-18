package com.furrybook.springmongo.controller;

import com.furrybook.springmongo.model.User.StandardUser;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody StandardUser user) {
        return service.addUser(user);
    }

    @GetMapping
    public List<User> getUsers() {
        return service.findAllExcludingPassword();
    }

    @GetMapping("/{Id}")
    public User getUser(@PathVariable String Id) {
        return service.getUserbyId(Id);
    }

    @PutMapping
    public User modifyUser(@RequestBody StandardUser user) {
        return service.updateUser(user);
    }
}
