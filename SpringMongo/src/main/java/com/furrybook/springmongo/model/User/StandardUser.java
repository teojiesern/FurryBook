package com.furrybook.springmongo.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.Stack;

import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StandardUser implements User {
    @Id
    private String id;
    private String name, email, password, gender, phoneNumber, relationshipStatus;
    private LocalDate birthDate;
    private int age;
    private String userType = "user";
    private String profilePicturePath;
    private String coverPhotoPath;
    // the use of arraylist here is so that we can easily add new entries of hobbies
    // to the arraylist and remove any hobbies that the user might decide to remove
    // by unchecking the checkboxes
    private ArrayList<String> hobbies = new ArrayList<>();
    // the use of stack here is so that the latest jobs can be pushed to the top so
    // we can easily access the latest jobs
    private Stack<String> jobs = new Stack<>();
    private Set<String> friendsId = new HashSet<String>();

    @Override
    public void setBirthdate(LocalDate birthdate) {
        this.birthDate = birthdate;
        this.age = Period.between(birthdate, LocalDate.now()).getYears();
    }

}