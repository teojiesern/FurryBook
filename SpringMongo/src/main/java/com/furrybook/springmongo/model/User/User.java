package com.furrybook.springmongo.model.User;

import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public interface User {
    String getId();
    String getPassword();
    String getProfilePicturePath();
    String getCoverPhotoPath();
    Set<String> getFriendsId();

    void setName(String name);
    void setEmail(String email);
    void setPassword(String password);
    void setProfilePicturePath(String newPath);
    void setCoverPhotoPath(String newPath);
    void setGender(String gender);
    void setPhoneNumber(String phoneNum);
    void setAge(int age);
}
