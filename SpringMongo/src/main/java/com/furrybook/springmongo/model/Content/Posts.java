package com.furrybook.springmongo.model.Content;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "posts")
public class Posts implements Comparable<Posts> {
    @Id
    private String id;
    private String caption;
    private String name;
    private String type;
    private String filePath;
    private LocalDateTime created;
    private List<String> likes;
    private String userId;
    @DocumentReference
    private ArrayList<Comments> comments;

    @Override
    public int compareTo(Posts other) {
        if (this.created.isAfter(other.created)) {
            return 1;
        } else if (this.created.isBefore(other.created)) {
            return -1;
        } else {
            return 0;
        }
    }
}
