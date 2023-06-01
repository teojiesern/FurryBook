package com.furrybook.springmongo.model.Requests;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.Data;

@Data
public class UserUpdateRequest {
    private String name;
    private String gender;
    private String phoneNumber;
    private String relationshipStatus;
    private String location;
    private LocalDate birthDate;
    private ArrayList<String> hobbiesUpdates;
    private List<String> jobUpdates;
}
