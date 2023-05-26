package com.furrybook.springmongo.model.extra;

import java.time.LocalDate;
import java.util.ArrayList;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String name;
    private String gender;
    private String phoneNumber;
    private String relationshipStatus;
    private LocalDate birthDate;
    private ArrayList<String> hobbies;

}
