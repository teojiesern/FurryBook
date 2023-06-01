import React from "react";
import { styled } from "styled-components";
import FriendCard from "../../components/FriendCard";
import { StyledContainer } from "../../Utils/StyledContainer";
import { useLoaderData, useLocation } from "react-router-dom";
import { TrackSession } from "../../api/trackSession";

const FriendList = styled.div`
    display: grid;
    grid-template-columns: 0.5fr 0.5fr;
    grid-template-rows: 1fr 1fr;
    gap: 0 10px;
`;

const FriendsContainer = styled.div`
    display: flex;
    margin: 10px 40px 6% 40px;
    padding: 20px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
`;

const Title = styled.h1`
    margin: 0;
    font-size: 30px;
    font-family: Montserrat, sans-serif;
`;

const FriendListContainer = ({ friends }) => {
    return friends.length === 0 ? (
        <p style={{ marginTop: "20px", fontWeight: "400" }}>No friends</p>
    ) : (
        <FriendList>
            {friends?.map((friend) => (
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

export function ProfileFriends() {
    const session = useLocation().pathname;
    const [friendData, setFriendData] = React.useState(useLoaderData());

    React.useEffect(() => {
        const tracking = async () => {
            const tempSession = await TrackSession(session);
        };

        tracking();
    }, []);

    const friendDataWithMutualCount = React.useMemo(() => {
        return friendData?.map((friend) => ({
            ...friend,
            mutualFriends: friend.mutualFriends.length,
        }));
    }, [friendData]);

    return (
        <StyledContainer>
            <FriendsContainer>
                <div style={{ flex: "6" }}>
                    <Title>Friends</Title>
                    <FriendListContainer friends={friendDataWithMutualCount} />
                </div>
            </FriendsContainer>
        </StyledContainer>
    );
}
