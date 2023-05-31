import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { styled } from "styled-components";
import FriendCard from "../../components/FriendCard";
import { StyledContainer } from "../../Utils/StyledContainer";

const FriendList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const StyledRequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 3;
`;

const FriendsContainer = styled.div`
    display: flex;
    margin: 10px 20px 6% 20px;
    padding: 20px;
`;

const Title = styled.h1`
    margin: 0;
    font-family: Montserrat, sans-serif;
`;

const StyledDividerContainer = styled.div`
    display: flex;
    justify-content: center;
    flex: 0.5;
`;

const StyledDividerLine = styled.div`
    height: 100%;
    width: 1.3px;
    background-color: gray;
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
                    userId={friend.friend.id}
                />
            ))}
        </FriendList>
    );
};

const Friends = () => {
    const [friendData, setFriendData] = useState(useLoaderData());
    const { userId } = useParams();

    const friendDataWithMutualCount = useMemo(() => {
        return friendData?.map((friend) => ({
            ...friend,
            mutualFriends: friend.mutualFriends.length,
        }));
    }, [friendData]);

    return (
        <StyledContainer>
            <FriendsContainer>
                <StyledRequestContainer>
                    <Title>Friend Requests</Title>
                </StyledRequestContainer>
                <StyledDividerContainer>
                    <StyledDividerLine></StyledDividerLine>
                </StyledDividerContainer>
                <div style={{ flex: "6" }}>
                    <Title>Friends</Title>
                    <FriendListContainer friends={friendDataWithMutualCount} />
                </div>
            </FriendsContainer>
        </StyledContainer>
    );
};

export default Friends;
