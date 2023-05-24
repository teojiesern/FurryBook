package com.furrybook.springmongo.model.Content;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "Comments")
public class Comments implements Comparable<Comments> {

    @Id
    private String id;
    private String body;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String userId;
    private String postId;

    public Comments(String body, LocalDateTime created, LocalDateTime updated, String userId, String postId) {
        this.body = body;
        this.created = created;
        this.updated = updated;
        this.userId = userId;
        this.postId = postId;
    }

    @Override
    public int compareTo(Comments other) {
        if (this.updated.isAfter(other.created)) {
            return 1;
        } else if (this.updated.isBefore(other.updated)) {
            return -1;
        } else {
            return 0;
        }
    }
}
