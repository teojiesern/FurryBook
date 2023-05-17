package com.example.demo.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.Factory.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
}
