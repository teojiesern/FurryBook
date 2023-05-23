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
import { LikePosts } from "../../api/LikePosts";
import { getTimeCreated } from "../../Utils/getTimeCreated";
import { Popup } from "../../Utils/Popup";
import { UserData } from "../../api/UserData";

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
    font-size: 20px;
    max-width: 90%;
    word-wrap: break-word;
    max-height: 6em;
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

const StyledParentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
`;

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

const StyledCommentsContainer = styled.div`
    display: flex;
    width: 75%;
    border-radius: 20px;
    background-color: white;
    margin: 20px auto 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
`;

const iconStyle = {
    marginRight: "5px",
};

const likeStyle = {
    color: "blue",
};

const pointer = {
    cursor: "pointer",
};

const commentContainerStyle = {
    padding: "20px",
    marginBottom: "0",
};

const noMarginBottom = {
    marginBottom: "0",
};

export function ProfilePosts() {
    const [profilePic, data] = useOutletContext();
    const [allPost, setAllPost] = React.useState(useLoaderData());
    const [isOpen, setIsOpen] = React.useState(false);
    const [allComments, setAllComments] = React.useState([]);
    const [details, setDetails] = React.useState([]);
    const [isComment, setIsComment] = React.useState(false);
    const currentLogin = localStorage.getItem("userId");

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    async function toggleComments(comments) {
        setIsComment(true);
        if (comments.length !== 0) {
            const listOfComments = await Promise.all(
                comments.map(async (c) => {
                    const displayTime = getTimeCreated(c);
                    const user = await UserData(c.userId);
                    const profilePic = user.profilePicturePath.split("/").pop();
                    return (
                        <StyledCommentsContainer key={c.id}>
                            <StyledPostSection style={commentContainerStyle}>
                                <StyledProfilePicture
                                    style={{
                                        backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                                    }}
                                ></StyledProfilePicture>
                                <StyledContentSection>
                                    <StyledInformations style={noMarginBottom}>
                                        <StyledName>{user.name}</StyledName>
                                        <StyledPosted>
                                            {displayTime}
                                        </StyledPosted>
                                        <StyledCaption>{c.body}</StyledCaption>
                                    </StyledInformations>
                                </StyledContentSection>
                            </StyledPostSection>
                        </StyledCommentsContainer>
                    );
                })
            );
            setAllComments(listOfComments);
        } else {
            setAllComments([]);
        }
    }

    function toggleDetails(data) {
        setIsComment(false);
    }

    const friends =
        data.friendsId.length == 0
            ? "No Friends"
            : `${data.friendsId.length} Friends`;

    const posts = allPost.map((post) => {
        const displayTime = getTimeCreated(post);

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
                    <StyledLikeAndCommentCount
                        style={pointer}
                        onClick={async () => {
                            togglePopup();
                            await toggleComments(post.comments);
                        }}
                    >
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
        <StyledParentContainer>
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
                <StyledEditButton
                    onClick={() => {
                        togglePopup();
                        toggleDetails(data);
                    }}
                >
                    Edit Details
                </StyledEditButton>
            </StyledPostContainer>
            <div style={{ width: "70%" }}>{posts}</div>
            {isOpen && (
                <Popup
                    content={
                        isComment
                            ? allComments.length === 0
                                ? "No comments yet, be the first to comment"
                                : allComments
                            : details
                    }
                    handleClose={togglePopup}
                    top={isComment ? "Comments Section" : "Edit Your Profile"}
                />
            )}
        </StyledParentContainer>
    );
}
