package com.furrybook.springmongo.model.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StandardUser implements User{
    @Id
    private String id;
    private String name, email, password, gender;
    private int age;
    private String userType = "standard";
}