import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { styled } from "styled-components";

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px 10px;
    margin: 20px 30px;
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

export function FriendsRecommendations() {
    const recommendations = useLoaderData();
    console.log(recommendations);

    const recommendedUser = recommendations.map((recommendation) => {
        const profilePic = recommendation.friend.profilePicturePath
            ?.split("/")
            .pop();
        const name = recommendation.friend.name;
        const mutualFriends = recommendation.mutualFriends.length;
        const id = recommendation.friend.id;
        return (
            <RecommendationStyle as={Link} to={`/FurryBook/profile/${id}`}>
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
                        <StyledName>{mutualFriends} mutual friends</StyledName>
                    </div>
                </StyledLeftPortion>
            </RecommendationStyle>
        );
    });
    return (
        <GridContainer>
            {recommendedUser}
        </GridContainer>
    );
}
