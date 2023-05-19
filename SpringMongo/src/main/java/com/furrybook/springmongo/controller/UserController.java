package com.furrybook.springmongo.controller;

import com.furrybook.springmongo.model.User.StandardUser;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/{userId}/friends/{friendId}")
    public ResponseEntity<String> addFriend(@PathVariable ("userId") String userId, @PathVariable ("friendId") String friendId) {
        User user = service.getUserbyId(userId);
        User friend = service.getUserbyId(friendId);

        if (user == null || friend == null) {
            return ResponseEntity.notFound().build();
        }

        service.addFriend(user, friend);

        return ResponseEntity.ok("Friend added successfully");
    }

    @GetMapping("/{userId}/friends/{friendId}")
    public ResponseEntity<String> checkFriend(@PathVariable ("userId") String userId, @PathVariable ("friendId") String friendId) {
        User user = service.getUserbyId(userId);
        User friend = service.getUserbyId(friendId);

        if (user == null || friend == null) {
            return ResponseEntity.notFound().build();
        }

        if (service.checkFriend(user, friend)) {
            return ResponseEntity.ok("Friend");
        } else {
            return ResponseEntity.ok("Not friends.");
        }
    }
}
