import React from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { styled } from "styled-components";
import { SendFriendRequest } from "../../api/SendFriendRequest";
import { TrackSession } from "../../api/trackSession";
import { StyledContainer } from "../../Utils/StyledContainer";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px 10px;
    margin: 20px 30px 40px 30px;
`;

const RecommendationStyle = styled.div`
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: black;
`;

const StyledLeftPortion = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const StyledName = styled.p`
    margin: 0;
    font-size: 25px;
    font-family: "Montserrat", sans-serif;
`;

const StyledProfilePic = styled.div`
    border-radius: 100px;
    width: 100px;
    height: 100px;
    background-size: cover;
    background-position: center;
    margin-right: 10px;
`;

const StyledButton = styled.button`
    border: none;
    background-color: #153fac;
    color: white;
    padding: 15px 30px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
`;

const StyledInteractionContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
`;

export function FriendsRecommendations() {
    const [added, setAdded] = React.useState({});
    const recommendations = useLoaderData();
    const session = useLocation().pathname;

    React.useEffect(() => {
        const tracking = async () => {
            const tempSession = await TrackSession(session);
        };

        tracking();
    }, []);

    async function handleAddFriend(id) {
        const temp = await SendFriendRequest(id);
        setAdded((prevAdded) => {
            return { ...prevAdded, [id]: true };
        });
    }

    const recommendedUser = recommendations?.map((recommendation) => {
        const profilePic = recommendation.friend.profilePicturePath
            ?.split("/")
            .pop();
        const name = recommendation.friend.name;
        const mutualFriends = recommendation.mutualFriends.length;
        const id = recommendation.friend.id;
        return (
            <div key={recommendation.friend.id}>
                <RecommendationStyle>
                    <div>
                        <StyledLeftPortion>
                            <StyledProfilePic
                                style={{
                                    backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <StyledName>{name}</StyledName>
                                <StyledName>
                                    {mutualFriends} mutual friends
                                </StyledName>
                            </div>
                        </StyledLeftPortion>
                    </div>
                    <StyledInteractionContainer>
                        <StyledButton
                            style={{
                                backgroundColor: "#e4e6eb",
                                color: "black",
                            }}
                            onClick={() =>
                                (window.location.href = `/FurryBook/profile/${id}`)
                            }
                        >
                            View Profile
                        </StyledButton>
                        <StyledButton
                            onClick={() => handleAddFriend(id)}
                            disabled={added[id]}
                        >
                            {added[id]
                                ? "Friend Request Sent"
                                : "Add as friend"}
                        </StyledButton>
                    </StyledInteractionContainer>
                </RecommendationStyle>
            </div>
        );
    });
    return (
        <StyledContainer>
            <GridContainer>{recommendedUser}</GridContainer>;
        </StyledContainer>
    );
}
