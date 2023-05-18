package com.furrybook.springmongo.model.User;

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
    private String name, email, password, gender;
    private int age;
    private String userType = "admin";
}
