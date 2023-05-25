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
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
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

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}/like/{postId}")
    public ResponseEntity<String> interactWithLikeButton(@PathVariable String postId, @PathVariable String userId) {
        service.interactWithLikeButton(postId, userId);
        return ResponseEntity.ok("Post like status updated successfully.");
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping()
    public List<Posts> getPosts() {
        return service.findAllPosts();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/images")
    public List<Posts> getAllImages() {
        return service.findAllImages();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/videos")
    public List<Posts> getAllVideos() {
        return service.findAllVideos();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/{postId}/user")
    public ResponseEntity<User> getUserFromPost(@PathVariable String postId) {
        User user = service.getUserFromPost(postId);
        return ResponseEntity.ok(user);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/user/{userId}/posts")
    public ResponseEntity<List<Posts>> getPostsByUser(@PathVariable String userId) {
        List<Posts> posts = service.getPostsByUser(userId);
        posts.sort(Collections.reverseOrder());
        for (Posts post : posts) {
            post.getComments().sort(Collections.reverseOrder());
        }
        return ResponseEntity.ok(posts);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public String deletePost(@PathVariable String id) {
        return service.deletePostById(id);
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping()
    public String clear() {
        return service.deleteAll();
    }
}
