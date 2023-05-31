import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { StyledContainer } from "../Utils/StyledContainer";
import { styled } from "styled-components";
import { getTimeCreated } from "../Utils/getTimeCreated";
import { ReadMore } from "../Utils/ReadMore";
import Masonry from "@mui/lab/Masonry";
import { AdminDeletePost } from "../api/AdminDeletePost";

const UserCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 15px 0;
    font-family: "Montserrat", sans-serif;
`;

const Value = styled.div`
    font-size: 16px;
    color: #50577a;
    margin: 0;
    margin-left: 10px;
`;

const Key = styled.h2`
    font-size: 18px;
    color: black;
    margin: 0;
`;

const InformationContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    padding: 2px 0;
`;

const StyledButton = styled.button`
    border: none;
    background-color: #153fac;
    color: white;
    padding: 13px 50px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
`;

const StyledCaption = styled.p`
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    max-width: 90%;
`;

const StyledPost = styled.div`
    height: 200px;
    width: 200px;
    background-size: cover;
    background-position: center;
`;

const linkStyle = {
    textDecoration: "none",
    marginLeft: "20px",
    fontSize: "30px",
    color: "black",
};

export function AdminPageUserPosts() {
    const [postData, setPostData] = React.useState(useLoaderData());

    async function handleDeletePost(postId) {
        const temp = await AdminDeletePost(postId)
        setPostData((prevPostData) =>
            prevPostData.filter((post) => post.id != postId)
        );
    }

    const allPosts = postData.map((post) => {
        const displayTime = getTimeCreated(post);
        return (
            <UserCard key={post.id}>
                <InformationContainer>
                    {post.caption ? (
                        <StyledCaption>
                            <ReadMore maxLines={5}>{post.caption}</ReadMore>
                        </StyledCaption>
                    ) : null}
                </InformationContainer>
                <InformationContainer>
                    {post.filePath ? (
                        post.filePath.endsWith(".mp4") ? (
                            <video
                                src={`/assets/post storage/${post.name}`}
                                loop
                                controls
                                style={{
                                    height: "400px",
                                    width: "400px",
                                }}
                            ></video>
                        ) : (
                            <StyledPost
                                style={{
                                    backgroundImage: `url("/assets/post storage/${post.name}")`,
                                }}
                            ></StyledPost>
                        )
                    ) : null}
                </InformationContainer>
                <InformationContainer>
                    <Key>Posted: </Key>
                    <Value>{displayTime}</Value>
                </InformationContainer>
                <InformationContainer>
                    <Key>Comment Count: </Key>
                    <Value>{post.comments.length}</Value>
                </InformationContainer>
                <InformationContainer>
                    <Key>Like Count: </Key>
                    <Value>{post.likes.length}</Value>
                </InformationContainer>
                <InformationContainer
                    style={{
                        justifyContent: "space-around",
                        marginTop: "20px",
                    }}
                >
                    <StyledButton
                        style={{ color: "black", backgroundColor: "#e4e6eb" }}
                        onClick={() => handleDeletePost(post.id)}
                    >
                        Delete Post
                    </StyledButton>
                </InformationContainer>
            </UserCard>
        );
    });
    return (
        <StyledContainer>
            <Link style={linkStyle} to="/FurryBook/adminPage">
                &larr;{" "}
                <span style={{ fontSize: "20px" }}>Back to admin page</span>
            </Link>
            {postData.length === 0 ? (
                <p>This user has yet to post anything</p>
            ) : (
                <Masonry columns={3} spacing={2} sx={{ paddingLeft: "20px" }}>
                    {allPosts}
                </Masonry>
            )}
        </StyledContainer>
    );
}
