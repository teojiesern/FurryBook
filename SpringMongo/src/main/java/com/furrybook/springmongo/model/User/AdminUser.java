package com.furrybook.springmongo.model.User;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

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
    // the use of arraylist here is so that we can easily add new entries of hobbies
    // to the arraylist and remove any hobbies that the user might decide to remove
    // by unchecking the checkboxes
    private ArrayList<String> hobbies = new ArrayList<>();
    // the use of arraylist here is because of its ability to have the most recently
    // added element to be the added to index 0 by using add(index, element) and it
    // will return
    // to me an array
    // consisting of the elements arranged nicely since i would have to fetch the
    // data from frontend, so it would be easier instead of using stack in which i
    // would have to either use iterator or pop
    // reason for not using linkedlist is because mongodb does not support
    // linkedlist
    private ArrayList<String> jobs = new ArrayList<>();
    // Using HashSet here is due to the ability of elimination of duplicates, this
    // prevents the user from having the same freind request from the same user
    // HashSet also provides faster element removal with linear time complexity
    // (O(n))
    private Set<String> friendsId = new HashSet<String>();
    // Using HashSet here is due to the ability of elimination of duplicates, this
    // prevents the user from having the same friend request more than once from the
    // same user
    // HashSet also provides for a faster element removal with linear time
    // complexity (O(n)), since removing a friend request is often done, this can
    // increase the performance of backend by a lot
    private Set<String> receivedFriendRequests = new HashSet<>();
    // Using HashSet here is due to the ability of elimination of duplicates, this
    // prevents the user from being able to send more than one friend request to the
    // same user
    // HashSet also provides for a faster element removal with linear time
    // complexity (O(n)), since removing a friend request is often done, this can
    // increase the performance of backend by a lot
    private Set<String> sentFriendRequests = new HashSet<>();

    @Override
    public void setBirthdate(LocalDate birthdate) {
        this.birthDate = birthdate;
        this.age = Period.between(birthdate, LocalDate.now()).getYears();
    }

    @Override
    public int compareTo(User otherUser) {
        String thisName = this.name.replaceAll("\\s+", "").toLowerCase();
        String otherName = otherUser.getName().replaceAll("\\s+", "").toLowerCase();
        int minLength = Math.min(thisName.length(), otherName.length());
        for (int i = 0; i < minLength; i++) {
            char thisChar = thisName.charAt(i);
            char otherChar = otherName.charAt(i);
            if (thisChar > otherChar)
                return 1;
            if (thisChar < otherChar)
                return -1;
        }
        return 0;
    }
}
