package com.furrybook.springmongo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.furrybook.springmongo.model.Content.Comments;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.service.CommentsService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/comments")
public class CommentsController {

    @Autowired
    private CommentsService commentsService;

    @GetMapping
    public List<Comments> getAllCommets() {
        return commentsService.findAllComments();
    }

    @GetMapping("/{commentId}/user")
    public ResponseEntity<User> getUserByComment(@PathVariable String commentId) {
        User user = commentsService.getUserByComment(commentId);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<Comments> createComment(@RequestBody Map<String, String> payload,
            @PathVariable String userId) {
        return new ResponseEntity<Comments>(
                commentsService.createComment(payload.get("commentBody"), payload.get("postId"), userId),
                HttpStatus.OK);
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<Void> updateCommentAndSyncWithPost(@PathVariable String commentId,
            @RequestBody Map<String, String> payload) {
        String newBody = payload.get("newBody");
        commentsService.updateCommentAndSyncWithPost(commentId, newBody);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{commentId}/posts/{postId}")
    public ResponseEntity<Void> deleteCommentAndRemoveFromPost(@PathVariable String commentId,
            @PathVariable String postId) {
        commentsService.deleteCommentAndRemoveFromPost(commentId, postId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<Void> deleteAllCommentsUnderPost(@PathVariable String postId) {
        commentsService.deleteAllCommentsUnderPost(postId);
        return ResponseEntity.ok().build();
    }

}
