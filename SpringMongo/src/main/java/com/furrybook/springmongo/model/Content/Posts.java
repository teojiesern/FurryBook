package com.furrybook.springmongo.model.Content;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;

import com.furrybook.springmongo.model.User.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "posts")
public class Posts {
    @Id
    private String id;
    private String name;
    private String type;
    private String filePath;
    private LocalDateTime created;
    private String userId;
    @DocumentReference
    private List<Comments> comments;
}