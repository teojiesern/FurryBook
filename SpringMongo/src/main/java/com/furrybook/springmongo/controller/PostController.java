package com.furrybook.springmongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.model.Content.Posts;
import com.furrybook.springmongo.service.PostService;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostService service;

    @PostMapping()
    public ResponseEntity<?> uploadImageToFIleSystem(@RequestParam("post") MultipartFile file) throws IOException {
        String uploadImage = service.uploadImageToFileSystem(file);
        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }

    @GetMapping()
    public List<Posts> getPosts() {
        return service.findAllPosts();
    }

    @GetMapping("/images")
    public List<Posts> getAllImages(){
        return service.findAllImages();
    }

    @GetMapping("/videos")
    public List<Posts> getAllVideos(){
        return service.findAllVideos();
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable String id) {
        return service.deletePostById(id);
    }
}
