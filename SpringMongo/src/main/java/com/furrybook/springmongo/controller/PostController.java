package com.furrybook.springmongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.model.Content.Posts;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.service.PostService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService service;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/{userId}")
    public ResponseEntity<?> uploadPost(@PathVariable String userId, @RequestParam("post") MultipartFile file)
            throws IOException {
        String uploadImage = service.uploadPost(userId, file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }
    // this postMapping needs endpoint url of localhost:3001/api/posts/{userId}, and
    // then a body of a file with the key "post"

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
        return ResponseEntity.ok(posts);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        return service.deletePostById(id);
    }

    @DeleteMapping()
    public String clear() {
        return service.deleteAll();
    }
}