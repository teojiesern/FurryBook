package com.furrybook.springmongo.model.User;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.Stack;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminUser implements User{
    @Id
    private String id;
    private String name, email, password, gender, phoneNumber, relationshipStatus;
    private int age;
    private String userType = "admin";
    private String profilePicturePath;
    private String coverPhotoPath;
    private ArrayList<String> hobbies;
    private Stack<String> jobs;
    private Set<String> friendsId = new HashSet<String>();
}
