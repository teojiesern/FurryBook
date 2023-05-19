package com.furrybook.springmongo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import com.furrybook.springmongo.model.Content.Comments;
import com.furrybook.springmongo.model.Content.Posts;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.repository.CommentsRepository;
import com.furrybook.springmongo.repository.UserRepository;

@Service
public class CommentsService {
    @Autowired
    private CommentsRepository commentsRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;

    public Comments createComment(String commentBody, String id, String userId) {
        Comments comment = new Comments(commentBody, LocalDateTime.now(), LocalDateTime.now(), userId, id);
        commentsRepository.insert(comment);

        mongoTemplate.update(Posts.class)
                .matching(Criteria.where("id").is(id))
                .apply(new Update().push("comments").value(comment))
                .first();

        return comment;
    }

    public void deleteCommentAndRemoveFromPost(String commentId, String postId) {
        commentsRepository.deleteById(commentId);

        Query query = new Query(Criteria.where("id").is(postId));
        Update update = new Update().pull("comments", Query.query(Criteria.where("id").is(commentId)));
        mongoTemplate.updateFirst(query, update, Posts.class);
    }

    public void updateCommentAndSyncWithPost(String commentId, String newBody) {
        Comments comment = commentsRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));

        comment.setBody(newBody);
        comment.setUpdated(LocalDateTime.now());
        commentsRepository.save(comment);

        Query query = new Query(Criteria.where("id").is(commentId));
        Update update = new Update().set("body", newBody);
        mongoTemplate.updateFirst(query, update, Posts.class);
    }

    public void deleteAllCommentsUnderPost(String postId) {
        Query query = new Query(Criteria.where("postId").is(postId));
        mongoTemplate.remove(query, Comments.class);

        Query updateQuery = new Query(Criteria.where("id").is(postId));
        Update update = new Update().unset("comments");
        mongoTemplate.updateFirst(updateQuery, update, Posts.class);
    }
    
    public User getUserByComment(String commentId) {
        Optional<Comments> optionalComment = commentsRepository.findById(commentId);
        if (optionalComment.isPresent()) {
            Comments comment = optionalComment.get();
            String userId = comment.getUserId();
            return userRepository.findById(userId).orElse(null);
        } else {
            return null;
        }
    }

    public List<Comments> findAllComments() {
        return commentsRepository.findAll();
    }
}
