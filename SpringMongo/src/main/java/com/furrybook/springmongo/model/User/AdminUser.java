package com.furrybook.springmongo.model.User;

import java.util.HashSet;
import java.util.Set;

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
    private String name, email, password, gender, phoneNumber;
    private int age;
    private String userType = "admin";
    private String profilePicturePath;
    private String coverPhotoPath;
    private Set<String> friendsId = new HashSet<String>();
}
