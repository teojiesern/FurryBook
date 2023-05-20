package com.furrybook.springmongo.repository;

import com.furrybook.springmongo.model.User.User;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UserRepository extends MongoRepository<User, String> {

    @Query("{userType: ?0}")
    List<User> findAllByType(String type);

    @Query(value = "{}", fields = "{ 'password': 0 }")
    List<User> findAllExcludingPassword();

    User findByEmail(String email);

    // @Transactional
    // @Query("UPDATE User u SET u.profilePicturePath = ?2 WHERE u.id = ?1")
    // void updateProfilePicturePath(String userId, String profilePicturePath);
    
    // @Transactional
    // @Query("UPDATE User u SET u.coverPhotoPath = ?2 WHERE u.id = ?1")
    // void updateCoverPhotoPath(String userId, String coverPhotoPath);

}
