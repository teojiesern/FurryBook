import React from "react";
<<<<<<< HEAD
import { useParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { styled } from "styled-components";
import FriendCard from "../components/FriendCard";
import { FriendsData } from "../api/Friends";

const FriendList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding-top: 50px;
`;

const FriendListContainer = ({ friends }) => {
    return (
        <FriendList>
            {friends.map((friend) => (
                <FriendCard
                    key={friend.friend.id}
                    profilePicture={friend.friend.profilePicturePath}
                    name={friend.friend.name}
                    mutualFriends={friend.mutualFriends}
                />
            ))}
        </FriendList>
    );
};

const Friends = () => {
    const [friendData, setFriendData] = useState([]);
    const { userId } = useParams();

    useEffect(() => {
        const fetchFriendData = async () => {
            const data = await FriendsData(userId);
            setFriendData(data);
        };

        fetchFriendData();
    }, [userId]);

    const friendDataWithMutualCount = useMemo(() => {
        return friendData.map((friend) => ({
            ...friend,
            mutualFriends: friend.mutualFriends.length,
        }));
    }, [friendData]);

=======

export function Friends() {
>>>>>>> c558d596e06be7e1662f7f02901807cb13fcdc8f
    return (
        <div>
            {friendData.length > 0 ? (
                <FriendListContainer friends={friendDataWithMutualCount} />
            ) : (
                <p>Loading friend data...</p>
            )}
        </div>
    )
}

export default Friends;
