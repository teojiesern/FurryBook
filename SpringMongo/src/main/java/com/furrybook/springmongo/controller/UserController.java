package com.furrybook.springmongo.controller;

import com.furrybook.springmongo.model.Friend.FriendMutual;
import com.furrybook.springmongo.model.Friend.FriendRequestDto;
import com.furrybook.springmongo.model.Requests.LoginRequest;
import com.furrybook.springmongo.model.Requests.UserUpdateRequest;
import com.furrybook.springmongo.model.User.StandardUser;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.repository.UserRepository;
import com.furrybook.springmongo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService service;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getUsers() {
        return service.findAllExcludingPassword();
    }

    @GetMapping("/{Id}")
    public User getUser(@PathVariable String Id) {
        return service.getUserbyId(Id);
    }

    @GetMapping("/email/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return service.findUserByEmail(email);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User createUser(@RequestBody StandardUser user) {
        return service.addUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest loginRequest) {
        User user = service.verifyLogin(loginRequest.getEmail(), loginRequest.getPassword());

        if (user != null) {
            return ResponseEntity.ok(user.getId());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed. Invalid credentials.");
        }
    }

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

    @GetMapping("/{userId}/profile-picture")
    public ResponseEntity<String> getProfilePicture(@PathVariable String userId) {
        User user = service.getUserbyId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String filePath = user.getProfilePicturePath();
        return ResponseEntity.ok(filePath);
    }

    @GetMapping("/{userId}/cover-photo")
    public ResponseEntity<String> getCoverPhoto(@PathVariable String userId) {
        User user = service.getUserbyId(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        String filePath = user.getCoverPhotoPath();
        return ResponseEntity.ok(filePath);
    }

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

    @PostMapping("friend/{userId}/{friendId}")
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

    @GetMapping("friend/{userId}/{friendId}")
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

    // Getting friends of user alongside with the mutual friend list.
    // Can be used to show list of friends at the friend page.
    @GetMapping("friend/{userId}")
    public List<FriendMutual> getFriends(@PathVariable String userId) {
        List<FriendMutual> mutualFriends = service.getFriendsWithMutualFriends(userId);
        return mutualFriends;
    }

    @GetMapping("mutual/{user1}/{user2}")
    public List<FriendMutual> getMutual(@PathVariable String user1, @PathVariable String user2) {
        List<String> mutualFriends = service.getMutualFriends(user1, user2);
        List<FriendMutual> detailedMutualFriend = new ArrayList<>();
        for (String mutualFriend : mutualFriends) {
            List<String> tempMutual = service.getMutualFriends(mutualFriend, user2);
            User tempUser = service.getUserbyId(mutualFriend);
            detailedMutualFriend.add(new FriendMutual(tempUser, tempMutual));
        }
        return detailedMutualFriend;
    }

    // Getting friend recommendations with the mutual friend list.
    // Can be used to recommend potential friends at the friend page.
    @GetMapping("recommendation/{userId}")
    public List<FriendMutual> getFriendRecommendation(@PathVariable String userId) {
        List<FriendMutual> friendrecommendations = service.getFriendRecommendations(userId);
        return friendrecommendations;
    }

    @DeleteMapping("friend/{userId}/{friendId}")
    public ResponseEntity<String> removeFriend(@PathVariable("userId") String userId,
            @PathVariable("friendId") String friendId) {
        User user = service.getUserbyId(userId);
        User friend = service.getUserbyId(friendId);

        if (user == null || friend == null) {
            return ResponseEntity.notFound().build();
        }

        boolean removed = service.removeFriend(user, friend);

        if (removed) {
            return ResponseEntity.ok("Friend removed successfully");
        } else {
            return ResponseEntity.badRequest().body("Unable to remove friend");
        }
    }

    @PostMapping("/send-request")
    public ResponseEntity<String> sendFriendRequest(@RequestBody FriendRequestDto friendRequestDto) {
        service.sendFriendRequest(friendRequestDto.getSenderId(), friendRequestDto.getReceiverId());
        return ResponseEntity.ok("Friend request sent successfully");
    }

    @PostMapping("/accept-request")
    public ResponseEntity<String> acceptFriendRequest(@RequestBody FriendRequestDto friendRequestDto) {
        service.acceptFriendRequest(friendRequestDto.getReceiverId(), friendRequestDto.getSenderId());
        return ResponseEntity.ok("Friend request accepted successfully");
    }

    @PostMapping("/decline-request")
    public ResponseEntity<String> declineFriendRequest(@RequestBody FriendRequestDto friendRequestDto) {
        service.declineFriendRequest(friendRequestDto.getReceiverId(), friendRequestDto.getSenderId());
        return ResponseEntity.ok("Friend request declined successfully");
    }

    @PostMapping("/search")
    public List<User> search(@RequestBody Map<String, String> body) {
        String queryString = body.get("query");
        return service.search(queryString);
    }

    @PostMapping("/friendship-status")
    public ResponseEntity<String> getFriendshipStatus(@RequestBody FriendRequestDto friendRequestDto) {
        return ResponseEntity
                .ok(service.getFriendshipStatus(friendRequestDto.getSenderId(), friendRequestDto.getReceiverId()));
    }

    @PostMapping("/mutual-friends")
    public List<String> getMutualBetweenTwoUsers(@RequestBody FriendRequestDto friendRequestDto) {
        return service.getMutualFriends(friendRequestDto.getReceiverId(), friendRequestDto.getSenderId());
    }

    @PostMapping("/trackSession")
    public void trackSession(@RequestBody String session) {
        service.traceSession(session);
    }

    @GetMapping("/getSession")
    public LinkedList<String> getSession() {
        return service.getSession();
    }

    @PostMapping("/clearSession")
    public void clearSession() {
        service.clearSession();
    }
}
