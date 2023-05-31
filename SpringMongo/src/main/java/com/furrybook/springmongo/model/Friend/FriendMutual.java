package com.furrybook.springmongo.model.Friend;

import java.util.List;

import com.furrybook.springmongo.model.User.User;

public class FriendMutual {
    private User friend;
    private List<String> mutualFriends;

    public FriendMutual(User user, List<String> mutualFriends) {
        this.friend = user;
        this.mutualFriends = mutualFriends;
    }

    public User getFriend() {
        return friend;
    }

    public List<String> getMutualFriends() {
        return mutualFriends;
    }
}
