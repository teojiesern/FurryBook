import React from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { styled } from "styled-components";
import { BiLike, BiComment } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GiLovers } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { LikePosts } from "../../Utils/LikePosts";

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 20px 40px 50px 40px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 20px 40px;
`;

const StyledPostSection = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 30px;
`;

const StyledContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
`;

const StyledInteractionSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-right: 30px;
    color: gray;
    border-top: 1px solid gray;
`;

const StyledProfilePicture = styled.div`
    height: 70px;
    width: 70px;
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
    cursor: pointer;
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

const containerStyle = {
    display: "flex",
    width: "100%",
    alignItems: "flex-start",
};

const changeStyle = {
    width: "30%",
    margin: "20px 0 50px 40px",
    color: "gray",
    fontFamily: "Montserrat, sans-serif",
};

const StyledInfosContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 20px;
`;

const StyledInfo = styled.h4`
    color: black;
    font-size: 15px;
    margin: 0;
`;

const StyledEditButton = styled.button`
    background-color: #gray;
    padding: 10px;
    text-align: center;
    color: black;
    width: 100%;
    border: none;
    border-radius: 10px;
`;

const StyledLikedAndCommented = styled.div`
    display: flex;
    justify-content: space-between;
    color: gray;
    // padding:
`;

const StyledLikeAndCommentCount = styled.p`
    color: gray;
    fontFamily: "Montserrat, sans-serif",
    font-size: 10px;
`;

const iconStyle = {
    marginRight: "5px",
};

export function ProfilePosts() {
    const [profilePic, data] = useOutletContext();
    const [allPost, setAllPost] = React.useState(useLoaderData());
    const currentLogin = localStorage.getItem("userId");

    const friends =
        data.friendsId.length == 0
            ? "No Friends"
            : `${data.friendsId.length} Friends`;

    const posts = allPost.map((post) => {
        // React.useEffect(() => {
        //     let count = post.likes.length
        // },[])
        const createdDate = new Date(post.created);
        const currentDate = new Date();
        let displayTime;
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

            displayTime = formattedTime;
        } else {
            const formattedDate = createdDate.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });

            displayTime = formattedDate;
        }

        const handleLike = async (postId) => {
            await LikePosts(postId);
            const updatedPosts = allPost.map((post) => {
                if (post.id === postId) {
                    const newLikes = [...post.likes, currentLogin];
                    const removedLikes = post.likes.filter(
                        (like) => like !== currentLogin
                    );
                    if (post.likes.indexOf(currentLogin) === -1) {
                        return { ...post, likes: newLikes };
                    }
                    return { ...post, likes: removedLikes };
                }
                return post;
            });

            setAllPost(updatedPosts);
        };

        const likeStyle = {
            color: "blue",
        };

        function handleComment() {}

        function handleShare() {}
        return (
            <StyledPostContainer key={post.id}>
                <StyledPostSection>
                    <StyledProfilePicture
                        style={{
                            backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                        }}
                    ></StyledProfilePicture>
                    <StyledContentSection>
                        <StyledInformations>
                            <StyledName>{data.name}</StyledName>
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
                <StyledLikedAndCommented>
                    {post.likes?.length == 0
                        ? "Be the first one to like this post"
                        : `${post.likes?.length} users liked this post`}{" "}
                    <StyledLikeAndCommentCount>
                        {post.comments.length + " Comments"}
                    </StyledLikeAndCommentCount>
                </StyledLikedAndCommented>
                <StyledInteractionSection>
                    <StyledInteractionButton
                        onClick={() => handleLike(post.id)}
                        style={
                            post.likes.indexOf(currentLogin) !== -1
                                ? likeStyle
                                : null
                        }
                    >
                        <BiLike style={IconStyle} />
                        <StyledInteractionText>Like</StyledInteractionText>
                    </StyledInteractionButton>
                    <StyledInteractionButton onClick={handleComment}>
                        <BiComment style={IconStyle} />
                        <StyledInteractionText>Comment</StyledInteractionText>
                    </StyledInteractionButton>
                    <StyledInteractionButton onClick={handleShare}>
                        <TbShare3 style={IconStyle} />
                        <StyledInteractionText>Share</StyledInteractionText>
                    </StyledInteractionButton>
                </StyledInteractionSection>
            </StyledPostContainer>
        );
    });
    return (
        <div style={containerStyle}>
            <StyledPostContainer style={changeStyle}>
                <StyledName style={{ marginBottom: "25px" }}>Intro</StyledName>
                <StyledInfosContainer>
                    <MdOutlineDriveFileRenameOutline style={iconStyle} />
                    <StyledInfo>{data.name}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <HiGlobeAsiaAustralia style={iconStyle} />
                    <StyledInfo>{data.email}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <IoPersonOutline style={iconStyle} />
                    <StyledInfo>{data.gender}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <FaBirthdayCake style={iconStyle} />
                    <StyledInfo>{data.email}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <GiLovers style={iconStyle} />
                    <StyledInfo>{data.email}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <FaUserFriends style={iconStyle} />
                    <StyledInfo>{friends}</StyledInfo>
                </StyledInfosContainer>
                <StyledEditButton>Edit Details</StyledEditButton>
            </StyledPostContainer>
            <div style={{ width: "70%" }}>{posts}</div>
        </div>
    );
}
