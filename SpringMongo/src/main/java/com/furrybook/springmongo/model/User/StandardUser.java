package com.furrybook.springmongo.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StandardUser implements User{
    @Id
    private String id;
    private String name, email, password, gender;
    private int age;
    private String userType = "user";
    private String profilePicturePath;
    private String coverPhotoPath;
    private Set<String> friendsId = new HashSet<String>();
}