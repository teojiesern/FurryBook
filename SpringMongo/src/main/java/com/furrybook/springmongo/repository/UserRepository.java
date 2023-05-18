package com.furrybook.springmongo.repository;

import com.furrybook.springmongo.model.User.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{userType: ?0}")
    List<User> findAllByType(String type); 

    @Query(value = "{}", fields = "{ 'password': 0 }")
    List<User> findAllExcludingPassword();

}
