package com.furrybook.springmongo.service;

import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.furrybook.springmongo.model.Content.Posts;
import com.furrybook.springmongo.model.User.User;
import com.furrybook.springmongo.repository.PostRepository;
import com.furrybook.springmongo.repository.UserRepository;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository fileDataRepository;

    @Autowired
    private UserRepository userRepository;

    private final String FOLDER_PATH = "C:/Users/User/Documents/WIA1002 DS/FurryBook/Frontend/public/assets/post storage/";

    // public String uploadPost(String Id, MultipartFile file) throws IOException {
    // String filePath = FOLDER_PATH + file.getOriginalFilename();
    // String contentType = file.getContentType();
    // String fileType;

    // if (contentType.startsWith("image/")) {
    // fileType = "image";
    // } else if (contentType.startsWith("video/")) {
    // fileType = "video";
    // } else {
    // throw new IllegalArgumentException("Invalid file type");
    // }
    // Posts fileData = fileDataRepository.save(Posts.builder()
    // .name(file.getOriginalFilename())
    // .type(fileType)
    // .filePath(filePath)
    // .userId(Id)
    // .created(LocalDateTime.now())
    // .build());

    // file.transferTo(new File(filePath));

    // if (fileData != null) {
    // return "file uploaded successfully : " + filePath;
    // }
    // return null;
    // }

    public String uploadPost(String userId, String caption, MultipartFile file) throws IOException {
        if (file != null && !file.isEmpty()) {
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

            file.transferTo(new File(filePath));

            Posts fileData = Posts.builder()
                    .name(file.getOriginalFilename())
                    .type(fileType)
                    .filePath(filePath)
                    .userId(userId)
                    .caption(caption)
                    .created(LocalDateTime.now())
                    .build();

            fileData = fileDataRepository.save(fileData);

            if (fileData != null) {
                return "File uploaded successfully: " + filePath;
            }
        } else {
            Posts postData = Posts.builder()
                    .name(null)
                    .type(null)
                    .filePath(null)
                    .userId(userId)
                    .caption(caption)
                    .created(LocalDateTime.now())
                    .build();

            postData = fileDataRepository.save(postData);

            if (postData != null) {
                return "Text post created successfully.";
            }
        }

        return null;
    }

    public User getUserFromPost(String postId) {
        Posts post = fileDataRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));
        String userId = post.getUserId();
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    public List<Posts> findAllPosts() {
        return fileDataRepository.findAll();
    }

    public List<Posts> getPostsByUser(String userId) {
        return fileDataRepository.findByUserId(userId);
    }

    public String deletePostById(String id) {
        Optional<Posts> optionalPost = fileDataRepository.findById(id);
        if (optionalPost.isPresent()) {
            Posts post = optionalPost.get();
            String filePath = post.getFilePath();

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

            fileDataRepository.deleteById(id);

            return "Post with id: " + id + " deleted.";
        } else {
            return "Post not found.";
        }
    }

    public String deleteAll() {
        File folder = new File(FOLDER_PATH);
        if (folder.exists() && folder.isDirectory()) {
            try {
                FileUtils.cleanDirectory(folder);
                System.out.println("All files within the folder deleted.");
            } catch (IOException e) {
                System.out.println("Failed to delete files within the folder: " + e.getMessage());
            }
        } else {
            System.out.println("Folder not found.");
        }
        fileDataRepository.deleteAll();
        return "all the entries has been deleted";
    }

    public List<Posts> findAllImages() {
        return fileDataRepository.findAllByType("image");
    }

    public List<Posts> findAllVideos() {
        return fileDataRepository.findAllByType("video");
    }

    public void interactWithLikeButton(String postId, String userId) {
        Posts post = fileDataRepository.findById(postId)
                .orElseThrow(() -> new IllegalArgumentException("Post not found"));

        List<String> likes = post.getLikes();
        if (likes == null) {
            likes = new ArrayList<>();
        }

        if (likes.contains(userId)) {
            likes.remove(userId);
        } else {
            likes.add(userId);
        }

        post.setLikes(likes);
        fileDataRepository.save(post);
    }

}
