package com.furrybook.springmongo.model.User;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.Stack;

import org.springframework.data.annotation.Id;

import com.furrybook.springmongo.model.Friend.FriendMutual;

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
    private ArrayList<String> receivedFriendRequests = new ArrayList<>();
    private ArrayList<String> sentFriendRequests = new ArrayList<>();

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
