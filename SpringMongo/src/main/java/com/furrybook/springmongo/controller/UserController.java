package com.furrybook.springmongo.controller;

import com.furrybook.springmongo.model.User.StandardUser;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.model.extra.LoginRequest;
import com.furrybook.springmongo.model.extra.UserUpdateRequest;
import com.furrybook.springmongo.repository.UserRepository;
import com.furrybook.springmongo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @Autowired
    private UserRepository userRepository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<User> getUsers() {
        return service.findAllExcludingPassword();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{Id}")
    public User getUser(@PathVariable String Id) {
        return service.getUserbyId(Id);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return service.findUserByEmail(email);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody StandardUser user) {
        return service.addUser(user);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = service.verifyLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user.getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Invalid credentials.");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}/profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String result = service.uploadProfilePicture(userId, file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading profile picture");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}/cover-photo")
    public ResponseEntity<String> uploadCoverPhoto(@PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String result = service.uploadCoverPhoto(userId, file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading cover photo");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}/update-profile-picture")
    public ResponseEntity<String> updateProfilePicture(@PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String result = service.updateProfilePicture(userId, file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating profile picture");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}/update-cover-photo")
    public ResponseEntity<String> updateCoverPhoto(@PathVariable String userId,
            @RequestParam("file") MultipartFile file) {
        try {
            String result = service.updateCoverPhoto(userId, file);
            return ResponseEntity.ok(result);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating cover photo");
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<String> getProfilePicture(@PathVariable String userId) {
        User user = service.getUserbyId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String filePath = user.getProfilePicturePath();
        return ResponseEntity.ok(filePath);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{userId}/cover-photo")
    public ResponseEntity<String> getCoverPhoto(@PathVariable String userId) {
        User user = service.getUserbyId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String filePath = user.getCoverPhotoPath();
        return ResponseEntity.ok(filePath);
    }

    // @CrossOrigin(origins = "*", allowedHeaders = "*")
    // @PutMapping
    // public User modifyUser(@RequestBody StandardUser user) {
    // return service.updateUser(user);
    // }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}/friends/{friendId}")
    public ResponseEntity<String> addFriend(@PathVariable("userId") String userId,
            @PathVariable("friendId") String friendId) {
        User user = service.getUserbyId(userId);
        User friend = service.getUserbyId(friendId);

        if (user == null || friend == null) {
            return ResponseEntity.notFound().build();
        }

        service.addFriend(user, friend);

        return ResponseEntity.ok("Friend added successfully");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{userId}/friends/{friendId}")
    public ResponseEntity<String> checkFriend(@PathVariable("userId") String userId,
            @PathVariable("friendId") String friendId) {
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

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable("id") String id, @RequestBody UserUpdateRequest request) {
        User user = service.getUserbyId(id);

        if (request.getName() != null) {
            user.setName(request.getName());
        }

        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }

        if (request.getLocation() != null) {
            user.setLocation(request.getLocation());
        }

        if (request.getPhoneNumber() != null) {
            user.setPhoneNumber(request.getPhoneNumber());
        }

        if (request.getRelationshipStatus() != null) {
            user.setRelationshipStatus(request.getRelationshipStatus());
        }

        if (request.getBirthDate() != null) {
            user.setBirthdate(request.getBirthDate());
        }

        if (request.getHobbiesUpdates() != null) {
            for (String hobbyUpdate : request.getHobbiesUpdates()) {
                if (user.getHobbies().contains(hobbyUpdate))
                    user.getHobbies().remove(hobbyUpdate);
                else
                    user.getHobbies().add(hobbyUpdate);
            }
        }

        if (request.getJobUpdates() != null) {
            for (String jobUpdate : request.getJobUpdates()) {
                if (user.getJobs().contains(jobUpdate))
                    user.getJobs().remove(jobUpdate);
                else
                    user.getJobs().add(0, jobUpdate);
            }
        }

        return userRepository.save(user);
    }

    // @CrossOrigin(origins = "*", allowedHeaders = "*")
    // @PostMapping("/search")
    // public List<User> search(@RequestBody String queryString) {
    // return service.search(queryString);
    // }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/search")
    public List<User> search(@RequestBody Map<String, String> body) {
        String queryString = body.get("query");
        return service.search(queryString);
    }

}
