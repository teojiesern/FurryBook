package com.furrybook.springmongo.repository;
import org.springframework.stereotype.Repository;
import com.furrybook.springmongo.model.Content.Comments;
import org.springframework.data.mongodb.repository.MongoRepository;

@Repository
public interface CommentsRepository extends MongoRepository<Comments, String> {
}

