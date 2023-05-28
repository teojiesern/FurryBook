package com.furrybook.springmongo.model.User;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
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
public class AdminUser implements User {
    @Id
    private String id;
    private String name, email, password, gender, phoneNumber, relationshipStatus, location;
    private LocalDate birthDate;
    private int age;
    private String userType = "admin";
    private String profilePicturePath;
    private String coverPhotoPath;
    private ArrayList<String> hobbies = new ArrayList<>();
    private ArrayList<String> jobs = new ArrayList<>();
    private Set<String> friendsId = new HashSet<String>();

    @Override
    public void setBirthdate(LocalDate birthdate) {
        this.birthDate = birthdate;
        this.age = Period.between(birthdate, LocalDate.now()).getYears();
    }
}
