package com.furrybook.springmongo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.model.Content.Posts;
import com.furrybook.springmongo.repository.PostRepository;
import com.furrybook.springmongo.utils.PostUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository fileDataRepository;

    private final String FOLDER_PATH = "C:/Users/User/Desktop/DS_assingment_file_storage/";

    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
        String filePath = FOLDER_PATH + file.getOriginalFilename();
        String contentType = file.getContentType();
        String fileType;

        if (contentType.startsWith("image/")) {
            fileType = "image";
        } else if (contentType.startsWith("video/")) {
            fileType = "video";
        } else {
            throw new IllegalArgumentException("Invalid file type");
        }
        Posts fileData = fileDataRepository.save(Posts.builder()
                .name(file.getOriginalFilename())
                .type(fileType)
                .filePath(filePath).build());

        file.transferTo(new File(filePath));

        if (fileData != null) {
            return "file uploaded successfully : " + filePath;
        }
        return null;
    }

    public List<Posts> findAllPosts() {
        return fileDataRepository.findAll();
    }

    public String deletePostById(String id) {
        Optional<Posts> optionalPost = fileDataRepository.findById(id);
        if (optionalPost.isPresent()) {
            Posts post = optionalPost.get();
            String filePath = post.getFilePath();
            
            // Delete the file
            File file = new File(filePath);
            if (file.exists()) {
                if (file.delete()) {
                    System.out.println("File deleted successfully.");
                } else {
                    System.out.println("Failed to delete the file.");
                }
            } else {
                System.out.println("File not found.");
            }
            
            // Delete the post from the database
            fileDataRepository.deleteById(id);
            
            return "Post with id: " + id + " deleted.";
        } else {
            return "Post not found.";
        }
    }    

    public List<Posts> findAllImages() {
        return fileDataRepository.findAllByType("image");
    }

    public List<Posts> findAllVideos() {
        return fileDataRepository.findAllByType("video");
    }
}
