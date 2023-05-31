package com.furrybook.springmongo.service;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.exception.ExistingEmailException;
import com.furrybook.springmongo.model.Friend.FriendMutual;
import com.furrybook.springmongo.model.User.*;
import com.furrybook.springmongo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private MongoOperations mongoOperations;

    public User addUser(StandardUser user) {
        User existingUser = repository.findByEmail(user.getEmail());
        if (existingUser != null) {
            throw new ExistingEmailException("User with the same email already exists");
        }
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

    public User updateName(String Id, String name) {
        User user = repository.findById(Id).get();
        user.setName(name);
        return repository.save(user);
    }

    // public User updateEmail(String Id) {
    // User user = repository.findById(Id).get();
    // user.setName(name);
    // return repository.save(user);
    // }

    public User updatePassword(String Id, String password) {
        User user = repository.findById(Id).get();
        user.setPassword(password);
        return repository.save(user);
    }

    public User updateGender(String Id, String gender) {
        User user = repository.findById(Id).get();
        user.setGender(gender);
        return repository.save(user);
    }

    public User updatePhoneNumber(String Id, String phoneNum) {
        User user = repository.findById(Id).get();
        user.setPhoneNumber(phoneNum);
        return repository.save(user);
    }

    public User updateAge(String Id, int age) {
        User user = repository.findById(Id).get();
        user.setAge(age);
        return repository.save(user);
    }

    public User updateRelationshipStatus(String Id, String relationshipStatus) {
        User user = repository.findById(Id).get();
        user.setRelationshipStatus(relationshipStatus);
        return repository.save(user);
    }

    public User updateBirthDate(String Id, LocalDate newBirthDate) {
        User user = repository.findById(Id).get();
        user.setBirthdate(newBirthDate);
        return repository.save(user);
    }

    public User updateHobbies(String Id, ArrayList<String> hobbies) {
        User user = repository.findById(Id).get();
        user.setHobbies(hobbies);
        return repository.save(user);
    }

    // public User addJobs(String Id, String newJob) {
    // User user = repository.findById(Id).get();
    // user.getJobs().push(newJob);
    // return repository.save(user);
    // }

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

    public List<User> search(String queryString) {
        List<User> temp = repository.findAll();
        ArrayList<User> everyone = new ArrayList<>(temp);
        ArrayList<User> matchedQuery = new ArrayList<>();
        for (User user : everyone) {
            if (isMatch(queryString, user.getName()) || isMatch(queryString, user.getId())
                    || isMatch(queryString, user.getEmail()) || isMatch(queryString, user.getPhoneNumber())) {
                matchedQuery.add(user);
            }
        }
        matchedQuery.sort(null);
        return matchedQuery;
    }

    private boolean isMatch(String query, String name) {
        return name.toLowerCase().contains(query.toLowerCase());
    }

    public void addFriend(User user, User friend) {
        user.getFriendsId().add(friend.getId());
        friend.getFriendsId().add(user.getId());
        repository.save(user);
        repository.save(friend);
    }

    public boolean removeFriend(User user, User friend) {
        boolean removed = user.getFriendsId().remove(friend.getId());
        friend.getFriendsId().remove(user.getId());

        if (removed) {
            repository.save(user);
            repository.save(friend);
        }

        return removed;
    }

    public List<String> getMutualFriends(String userId1, String userId2) {
        Set<String> user1Friends = repository.findById(userId1).get().getFriendsId();
        Set<String> user2Friends = repository.findById(userId2).get().getFriendsId();

        Set<String> mutualFriends = new HashSet<>(user1Friends);
        mutualFriends.retainAll(user2Friends);

        return new ArrayList<>(mutualFriends);
    }

    public List<FriendMutual> getFriendsWithMutualFriends(String givenUserId) {
        List<FriendMutual> mutualFriendsList = new ArrayList<>();
        // Set<String> visited = new HashSet<>();
        // Queue<String> queue = new LinkedList<>();

        // queue.add(givenUserId);
        // visited.add(givenUserId);

        // while(!queue.isEmpty()) {
        User currentUser = repository.findById(givenUserId).get();

        for (String friend : currentUser.getFriendsId()) {
            // if (!visited.contains(friend)) {
            // visited.add(friend);

            List<String> mutualFriends = getMutualFriends(givenUserId, friend);
            mutualFriendsList.add(new FriendMutual(repository.findById(friend).get(), mutualFriends));

            // queue.add(friend);
            // }
        }
        // }

        return mutualFriendsList;
    }

    public List<FriendMutual> getFriendRecommendations(String userId) {
        // Set<FriendMutual> friendRecommendations = new HashSet<>();
        Set<String> visited = new HashSet<>();
        List<FriendMutual> friendRecommendations = new ArrayList<>();
        Set<String> immediateFriends = repository.findById(userId).get().getFriendsId();
        List<String> sentRequest = repository.findById(userId).get().getSentFriendRequests();
        List<String> receivedRequest = repository.findById(userId).get().getReceivedFriendRequests();

        for (String immediateFriend : immediateFriends) {
            Set<String> friendsOfFriend = repository.findById(immediateFriend).get().getFriendsId();
            for (String friendOfFriend : friendsOfFriend) {
                if (!immediateFriends.contains(friendOfFriend) && !friendOfFriend.equals(userId)
                        && !visited.contains(friendOfFriend) && !sentRequest.contains(friendOfFriend)
                        && !receivedRequest.contains(friendOfFriend)) {
                    List<String> mutualFriends = getMutualFriends(userId, friendOfFriend);
                    friendRecommendations
                            .add(new FriendMutual(repository.findById(friendOfFriend).get(), mutualFriends));
                    visited.add(friendOfFriend);
                }
            }
        }

        friendRecommendations.sort(Comparator.comparing(a -> a.getMutualFriends().size()));

        return friendRecommendations;
    }

    public void sendFriendRequest(String senderId, String receiverId) {
        User sender = repository.findById(senderId).get();
        User receiver = repository.findById(receiverId).get();

        // Add receiverId to the sentFriendRequests of the sender
        sender.getSentFriendRequests().add(receiverId);
        repository.save(sender);

        // Add senderId to the receivedFriendRequests of the receiver
        receiver.getReceivedFriendRequests().add(senderId);
        repository.save(receiver);
    }

    public void declineFriendRequest(String receiverId, String senderId) {
        User receiver = repository.findById(receiverId).get();
        User sender = repository.findById(senderId).get();
        receiver.getReceivedFriendRequests().remove(senderId);
        repository.save(receiver);
        sender.getSentFriendRequests().remove(receiverId);
        repository.save(sender);
    }

    public void acceptFriendRequest(String receiverId, String senderId) {
        User receiver = repository.findById(receiverId).get();
        User sender = repository.findById(senderId).get();

        // Add senderId to the friendsId of the receiver
        receiver.getFriendsId().add(senderId);
        repository.save(receiver);

        // Add receiverId to the friendsId of the sender
        sender.getFriendsId().add(receiverId);
        repository.save(sender);

        // Remove senderId from the receivedFriendRequests of the receiver
        receiver.getReceivedFriendRequests().remove(senderId);
        repository.save(receiver);

        // Remove receiverId from the sentFriendRequests of the sender
        sender.getSentFriendRequests().remove(receiverId);
        repository.save(sender);
    }

    public Boolean checkFriend(User user, User friend) {
        return user.getFriendsId().contains(friend.getId());
    }

    public boolean areFriends(String userId1, String userId2) {
        User user1 = repository.findById(userId1).get();
        // User user2 = repository.findById(userId2).get();

        if (user1.getFriendsId().contains(userId2)) {
            return true;
        }

        // if (user2.getFriendsId().contains(userId1)) {
        // return true;
        // }

        return false;
    }

    public boolean hasPendingFriendRequest(String userId1, String userId2) {
        User user1 = repository.findById(userId1).get();
        User user2 = repository.findById(userId2).get();

        if (user1.getReceivedFriendRequests().contains(userId2)
                || user2.getReceivedFriendRequests().contains(userId1)) {
            return true;
        }

        return false;
    }

    // public void sendFriendRequest(String senderId, String receiverId) {
    // User sender = repository.findById(senderId).get();
    // User receiver = repository.findById(receiverId).get();
    // List<String> mutualFriends = getMutualFriends(senderId, receiverId);

    // FriendMutual senderFriend = new FriendMutual(sender, mutualFriends);
    // FriendMutual receiverFriend = new FriendMutual(receiver, mutualFriends);

    // // Add receiverFriend to the sentFriendRequests of the sender
    // sender.getSentFriendRequests().add(receiverFriend);
    // repository.save(sender);

    // // Add senderFriend to the receivedFriendRequests of the receiver
    // receiver.getReceivedFriendRequests().add(senderFriend);
    // repository.save(receiver);
    // }

    // public void declineFriendRequest(String receiverId, String senderId) {
    // User receiver = repository.findById(receiverId).get();
    // User sender = repository.findById(senderId).get();
    // List<String> mutualFriends = getMutualFriends(receiverId, senderId);

    // FriendMutual senderFriend = new FriendMutual(sender, mutualFriends);
    // FriendMutual receiverFriend = new FriendMutual(receiver, mutualFriends);

    // receiver.getReceivedFriendRequests().remove(senderFriend);
    // repository.save(receiver);
    // sender.getSentFriendRequests().remove(receiverFriend);
    // repository.save(sender);
    // }

    // public void acceptFriendRequest(String receiverId, String senderId) {
    // User receiver = repository.findById(receiverId).get();
    // User sender = repository.findById(senderId).get();
    // List<String> mutualFriends = getMutualFriends(receiverId, senderId);

    // FriendMutual senderFriend = new FriendMutual(sender, mutualFriends);
    // FriendMutual receiverFriend = new FriendMutual(receiver, mutualFriends);

    // // Add senderFriend to the friendsId of the receiver
    // receiver.getFriendsId().add(senderId);
    // repository.save(receiver);

    // // Add receiverFriend to the friendsId of the sender
    // sender.getFriendsId().add(receiverId);
    // repository.save(sender);

    // // Remove senderFriend from the receivedFriendRequests of the receiver
    // receiver.getReceivedFriendRequests().remove(senderFriend);
    // repository.save(receiver);

    // // Remove receiverFriend from the sentFriendRequests of the sender
    // sender.getSentFriendRequests().remove(receiverFriend);
    // repository.save(sender);
    // }

    // // public boolean areFriends(String userId1, String userId2) {
    // // User user1 = repository.findById(userId1).get();

    // // for (FriendMutual friendMutual : user1.getFriendsId()) {
    // // if (friendMutual.getFriend().getId().equals(userId2)) {
    // // return true;
    // // }
    // // }
    // // return false;
    // // }

    // public boolean hasPendingFriendRequest(String userId1, String userId2) {
    // User user1 = repository.findById(userId1).get();
    // User user2 = repository.findById(userId2).get();

    // FriendMutual user1Friend = new FriendMutual(user1, new ArrayList<>());
    // FriendMutual user2Friend = new FriendMutual(user2, new ArrayList<>());

    // if (user1.getReceivedFriendRequests().contains(user2Friend)
    // || user2.getReceivedFriendRequests().contains(user1Friend)) {
    // return true;
    // }
    // return false;
    // }

}
