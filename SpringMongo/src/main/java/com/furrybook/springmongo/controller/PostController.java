package com.furrybook.springmongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.model.Content.Posts;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.service.PostService;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService service;

    @PostMapping("/{userId}")
    public ResponseEntity<?> uploadPost(@PathVariable String userId, @RequestParam("caption") String caption,
            @RequestParam("post") MultipartFile file)
            throws IOException {
        String uploadImage = service.uploadPost(userId, caption, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }
    // this postMapping needs endpoint url of localhost:3001/api/posts/{userId}, and
    // then a body of a file with the key "post" and "caption"

    @PostMapping("/{userId}/like/{postId}")
    public ResponseEntity<String> interactWithLikeButton(@PathVariable String postId, @PathVariable String userId) {
        service.interactWithLikeButton(postId, userId);
        return ResponseEntity.ok("Post like status updated successfully.");
    }

    @GetMapping()
    public List<Posts> getPosts() {
        return service.findAllPosts();
    }

    @GetMapping("/images")
    public List<Posts> getAllImages() {
        return service.findAllImages();
    }

    @GetMapping("/videos")
    public List<Posts> getAllVideos() {
        return service.findAllVideos();
    }

    @GetMapping("/{postId}/user")
    public ResponseEntity<User> getUserFromPost(@PathVariable String postId) {
        User user = service.getUserFromPost(postId);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<Posts>> getPostsByUser(@PathVariable String userId) {
        List<Posts> posts = service.getPostsByUser(userId);
        posts.sort(Collections.reverseOrder());
        for (Posts post : posts) {
            post.getComments().sort(Collections.reverseOrder());
        }
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable String id) {
        return service.deletePostById(id);
    }

    @DeleteMapping()
    public String clear() {
        return service.deleteAll();
    }

    @GetMapping("/user/{userId}/friends")
    public ResponseEntity<List<Posts>> getPostsByUserFriends(@PathVariable String userId) {
        List<Posts> friendPosts = service.getPostsByUserFriends(userId);
        for (Posts post : friendPosts) {
            post.getComments().sort(Collections.reverseOrder());
        }
        return ResponseEntity.ok(friendPosts);
    }
}
