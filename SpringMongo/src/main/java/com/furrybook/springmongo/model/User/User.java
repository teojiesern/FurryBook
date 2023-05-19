package com.furrybook.springmongo.model.User;

import java.util.Set;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public interface User {
    String getId();
    Set<String> getFriendsId();

    void setName(String name);

    void setEmail(String email);

    void setPassword(String password);
}
