import React from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { BiLike, BiComment } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 20px 40px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px 20px 20px 50px;
`;

const StyledPostSection = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
`;

const StyledContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
`;

const StyledInteractionSection = styled.div`
    display: flex;
    align-self: flex-end;
    justify-content: space-between;
    width: 25%;
    height: 50px;
    margin-right: 30px;
    color: #153fac;
`;

const StyledProfilePicture = styled.div`
    height: 90px;
    width: 90px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
    margin-right: 20px;
`;

const StyledCaption = styled.p`
    font-family: "Montserrat", sans-serif;
    font-size: 30px;
    max-width: 90%;
    word-wrap: break-word;
    max-height: 3em;
    overflow: hidden;
    margin-bottom: 30px;
`;

const StyledInteractionButton = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;
`;

const StyledInteractionText = styled.p`
    margin: 0;
    margin-left: 10px;
`;

const IconStyle = {
    marginTop: "3.5px",
};

const StyledPost = styled.div`
    height: 200px;
    width: 200px;
    background-size: cover;
    background-position: center;
`;

const StyledInformations = styled.div`
    display: flex;
    flex-direction: column;
    font-family: "Montserrat", sans-serif;
    margin-bottom: 20px;
`;

const StyledName = styled.h1`
    margin: 0;
    font-size: 30px;
`;

const StyledPosted = styled.p`
    margin: 0;
    font-size: 15px;
    color: gray;
`;

export function ProfilePosts() {
    const allPost = useLoaderData();
    const [profilePic, name] = useOutletContext();
    const posts = allPost.map((post) => {
        const createdDate = new Date(post.created);
        const currentDate = new Date();
        let displayTime
        const timeDiff = currentDate.getTime() - createdDate.getTime();

        if (timeDiff < 86400000) {
            const minutes = Math.floor(timeDiff / 60000);
            const hours = Math.floor(timeDiff / 3600000); 

            let formattedTime;
            if (minutes < 60) {
                formattedTime = `${minutes} minutes ago`;
            } else {
                formattedTime = `${hours} hours ago`;
            }

            displayTime = formattedTime
        } else {
            const formattedDate = createdDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            displayTime = formattedDate
        }

        return (
            <StyledPostContainer>
                <StyledPostSection>
                    <StyledProfilePicture
                        style={{
                            backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                        }}
                    ></StyledProfilePicture>
                    <StyledContentSection>
                        <StyledInformations>
                            <StyledName>{name}</StyledName>
                            <StyledPosted>{displayTime}</StyledPosted>
                        </StyledInformations>
                        {post.caption ? (
                            <StyledCaption>{post.caption}</StyledCaption>
                        ) : null}
                        {post.filePath ? (
                            <StyledPost
                                style={{
                                    backgroundImage: `url("/assets/post storage/${post.name}")`,
                                }}
                            ></StyledPost>
                        ) : null}
                    </StyledContentSection>
                </StyledPostSection>
                <StyledInteractionSection>
                    <StyledInteractionButton>
                        <BiLike style={IconStyle} />
                        <StyledInteractionText>Like</StyledInteractionText>
                    </StyledInteractionButton>
                    <StyledInteractionButton>
                        <BiComment style={IconStyle} />
                        <StyledInteractionText>Comment</StyledInteractionText>
                    </StyledInteractionButton>
                    <StyledInteractionButton>
                        <TbShare3 style={IconStyle} />
                        <StyledInteractionText>Share</StyledInteractionText>
                    </StyledInteractionButton>
                </StyledInteractionSection>
            </StyledPostContainer>
        );
    });
    return <div>{posts}</div>;
}
