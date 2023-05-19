package com.furrybook.springmongo.repository;
import org.springframework.stereotype.Repository;
import com.furrybook.springmongo.model.Content.Posts;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

@Repository
public interface PostRepository extends MongoRepository<Posts, String> {
    Optional<Posts> findByName(String fileName);
    
    @Query("{type: ?0}")
    List<Posts> findAllByType(String type); 
}

