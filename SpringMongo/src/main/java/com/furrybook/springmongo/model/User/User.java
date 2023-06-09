package com.furrybook.springmongo.model.User;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public interface User extends Comparable<User> {
    String getId();

    String getName();

    String getPassword();

    String getProfilePicturePath();

    String getCoverPhotoPath();

    ArrayList<String> getHobbies();

    ArrayList<String> getJobs();

    Set<String> getFriendsId();

    String getEmail();

    String getPhoneNumber();

    Set<String> getSentFriendRequests();

    Set<String> getReceivedFriendRequests();

    Object getUserType();

    void setName(String name);

    void setBirthdate(LocalDate birthdate);

    void setLocation(String location);

    void setEmail(String email);

    void setPassword(String password);

    void setProfilePicturePath(String newPath);

    void setCoverPhotoPath(String newPath);

    void setGender(String gender);

    void setPhoneNumber(String phoneNum);

    void setAge(int age);

    void setRelationshipStatus(String relationshipStatus);

    void setHobbies(ArrayList<String> hobbies);

    void setJobs(ArrayList<String> jobs);

}
