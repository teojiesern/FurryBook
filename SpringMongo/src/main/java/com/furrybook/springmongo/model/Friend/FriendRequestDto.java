package com.furrybook.springmongo.model.Friend;

import lombok.Data;

@Data
public class FriendRequestDto {
    private String senderId;
    private String receiverId;
}

