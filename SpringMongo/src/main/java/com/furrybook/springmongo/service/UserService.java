package com.furrybook.springmongo.service;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.model.User.*;
import com.furrybook.springmongo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MongoOperations mongoOperations;

    public User addUser(StandardUser user) {
        return repository.save(user);
    }

    // probably can use if want encrypt
    // public User addUser(StandardUser user) {
    // BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    // String encryptedPassword = passwordEncoder.encode(user.getPassword());
    // user.setPassword(encryptedPassword);

    // return repository.save(user);
    // }

    public User addAdminUser(AdminUser user) {
        return repository.save(user);
    }

    public List<User> findAllUsers() {
        return repository.findAll();
    }

    public List<User> findAllStUsers() {
        return repository.findAllByType("standard");
    }

    public List<User> findAllAdmin() {
        return repository.findAllByType("admin");
    }

    public List<User> findAllExcludingPassword() {
        return repository.findAllExcludingPassword();
    }

    public User findUserByEmail(String email) {
        return repository.findByEmail(email);
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
        User user = repository.findById(Id).orElse(null);

        if (user == null) {
            return "User not found.";
        }

        String profilePicturePath = user.getProfilePicturePath();
        String coverPhotoPath = user.getCoverPhotoPath();
        if (profilePicturePath != null) {
            deleteFile(profilePicturePath);
        }
        if (coverPhotoPath != null) {
            deleteFile(coverPhotoPath);
        }

        repository.deleteById(Id);
        return "User " + Id + " is deleted.";
    }

    public User verifyLogin(String email, String password) {
        User user = repository.findByEmail(email);

        if (user != null && verifyPassword(password, user.getPassword())) {
            return user;
        }

        return null;
    }

    private boolean verifyPassword(String plainPassword, String storedPassword) {
        return plainPassword.equals(storedPassword);
    }

    private final String profilePicPath = "C:/Users/User/Documents/WIA1002 DS/FurryBook/Frontend/public/assets/profile pictures/";
    private final String backgroundPicPath = "C:/Users/User/Documents/WIA1002 DS/FurryBook/Frontend/public/assets/background photos/";

    public String uploadProfilePicture(String userId, MultipartFile file) throws IOException {
        String filePath = profilePicPath + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        Query query = new Query(Criteria.where("_id").is(userId));
        Update update = new Update().set("profilePicturePath", filePath);
        mongoOperations.updateFirst(query, update, User.class);

        return "Profile picture uploaded successfully.";
    }

    public String uploadCoverPhoto(String userId, MultipartFile file) throws IOException {
        String filePath = backgroundPicPath + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        Query query = new Query(Criteria.where("_id").is(userId));
        Update update = new Update().set("coverPhotoPath", filePath);
        mongoOperations.updateFirst(query, update, User.class);

        return "Cover photo uploaded successfully.";
    }

    public String updateProfilePicture(String userId, MultipartFile file) throws IOException {
        User user = repository.findById(userId).orElse(null);
        if (user == null) {
            return "User not found.";
        }

        String newFilePath = profilePicPath + StringUtils.cleanPath(file.getOriginalFilename());

        if (user.getProfilePicturePath() != null) {
            String oldFilePath = user.getProfilePicturePath();
            deleteFile(oldFilePath);
        }
        saveFile(file, newFilePath);
        user.setProfilePicturePath(newFilePath);
        repository.save(user);

        return "Profile picture updated successfully.";
    }

    public String updateCoverPhoto(String userId, MultipartFile file) throws IOException {
        User user = repository.findById(userId).orElse(null);
        if (user == null) {
            return "User not found.";
        }

        String newFilePath = backgroundPicPath + StringUtils.cleanPath(file.getOriginalFilename());

        if (user.getCoverPhotoPath() != null) {
            String oldFilePath = user.getCoverPhotoPath();
            deleteFile(oldFilePath);
        }
        saveFile(file, newFilePath);
        user.setCoverPhotoPath(newFilePath);
        repository.save(user);

        return "Cover photo updated successfully.";
    }

    private void deleteFile(String filePath) {
        File file = new File(filePath);
        if (file.exists()) {
            file.delete();
        }
    }

    private void saveFile(MultipartFile file, String filePath) throws IOException {
        File dest = new File(filePath);
        file.transferTo(dest);
    }

    public void addFriend(User user, User friend) {
        user.getFriendsId().add(friend.getId());
        friend.getFriendsId().add(user.getId());
        repository.save(user);
        repository.save(friend);
    }

    public Boolean checkFriend(User user, User friend) {
        return user.getFriendsId().contains(friend.getId());
    }
}
