import React, { useRef } from "react";
import { getTimeCreated } from "../Utils/getTimeCreated";
import { LikePosts } from "../api/LikePosts";
import { AllPosts } from "../api/AllPosts";
import { styled } from "styled-components";
import { ReadMore } from "../Utils/ReadMore";
import { BiLike, BiComment } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { Form } from "react-router-dom";
import { UserData } from "../api/UserData";
import { Popup } from "../Utils/Popup";

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

const StyledProfilePicture = styled.div`
    height: 70px;
    width: 70px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
    margin-right: 20px;
`;

const StyledContentSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;
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

const StyledCaption = styled.p`
    font-family: "Montserrat", sans-serif;
    font-size: 20px;
    max-width: 90%;
    margin-bottom: 30px;
`;

const StyledPost = styled.div`
    height: 200px;
    width: 200px;
    background-size: cover;
    background-position: center;
`;

const StyledLikedAndCommented = styled.div`
    display: flex;
    justify-content: space-between;
    color: gray;
`;

const StyledLikeAndCommentCount = styled.p`
    color: gray;
    fontFamily: "Montserrat, sans-serif",
    font-size: 10px;
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

const StyledInteractionSection = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 50px;
    margin-right: 30px;
    color: gray;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
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

const pointer = {
    cursor: "pointer",
};

const likeStyle = {
    color: "blue",
};

const IconStyle = {
    marginTop: "3.5px",
};

const postCommentStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "30px 5px",
    fontFamily: "Montserrat, sans-serif",
};

const inputStyle = {
    width: "75%",
    border: "none",
    backgroundColor: "#F6F6F6",
    padding: "10px 20px",
    borderRadius: "10px",
};

const submitButtonStyle = {
    width: "20%",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#153fac",
    color: "white",
};

const commentContainerStyle = {
    padding: "20px",
    marginBottom: "0",
};

//needs three parameter which are the userId of the user that you want to see their post, just go local storage and get this, the profilPic which uses the data.profilePicturePath.split("/").pop(), and also the data which is user object that posted these posts
export function Posts({ userId, profilePic, datas }) {
    const [data, setData] = React.useState(datas);
    const [allPost, setAllPost] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [allComments, setAllComments] = React.useState([]);
    const currentLogin = localStorage.getItem("userId");
    const postRef = useRef();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const updateComments = () => {
        setData({ ...data, comments: "d" });
    };

    React.useEffect(() => {
        const getAllPost = async () => {
            const temp = await AllPosts(userId);
            setAllPost(temp);
        };
        getAllPost();
    }, [userId, data]);

    async function toggleComments(comments) {
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
                                    <StyledInformations>
                                        <StyledName>{user.name}</StyledName>
                                        <StyledPosted>
                                            {displayTime}
                                        </StyledPosted>
                                        <StyledCaption>
                                            <p
                                                style={{
                                                    wordBreak: "break-word",
                                                }}
                                            >
                                                <ReadMore maxLines={2}>
                                                    {c.body}
                                                </ReadMore>
                                            </p>
                                        </StyledCaption>
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

        function handleShare() {}

        return (
            <StyledPostContainer key={post.id} ref={postRef}>
                <StyledPostSection>
                    <StyledProfilePicture
                        style={{
                            backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                        }}
                    ></StyledProfilePicture>
                    <StyledContentSection>
                        <StyledInformations>
                            <StyledName>{data?.name}</StyledName>
                            <StyledPosted>{displayTime}</StyledPosted>
                        </StyledInformations>
                        {post.caption ? (
                            <StyledCaption>
                                <ReadMore maxLines={5}>{post.caption}</ReadMore>
                            </StyledCaption>
                        ) : null}
                        {post.filePath ? (
                            post.filePath.endsWith(".mp4") ? (
                                <video
                                    src={`/assets/post storage/${post.name}`}
                                    loop
                                    controls
                                    style={{
                                        height: "400px",
                                        width: "400px",
                                        display: isOpen ? "none" : null,
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
                    </StyledContentSection>
                </StyledPostSection>
                <StyledLikedAndCommented>
                    {post.likes?.length == 0
                        ? "Be the first one to like this post"
                        : `${post.likes?.length} users liked this post`}{" "}
                    <StyledLikeAndCommentCount
                        style={pointer}
                        onClick={async () => {
                            await toggleComments(post.comments);
                            togglePopup();
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
                    <StyledInteractionButton
                        onClick={async () => {
                            togglePopup();
                            await toggleComments(post.comments);
                        }}
                    >
                        <BiComment style={IconStyle} />
                        <StyledInteractionText>Comment</StyledInteractionText>
                    </StyledInteractionButton>
                    <StyledInteractionButton onClick={handleShare}>
                        <TbShare3 style={IconStyle} />
                        <StyledInteractionText>Share</StyledInteractionText>
                    </StyledInteractionButton>
                </StyledInteractionSection>
                <Form method="post" style={postCommentStyle}>
                    <input type="hidden" name="postId" value={post.id} />
                    <input
                        type="text"
                        name="comment"
                        style={inputStyle}
                        placeholder="Type a comment..."
                    ></input>
                    <button style={submitButtonStyle} onClick={updateComments}>
                        Comment
                    </button>
                </Form>
            </StyledPostContainer>
        );
    });
    return (
        <div style={{ width: "70%" }}>
            <div>{posts}</div>
            {isOpen && (
                <Popup
                    handleClose={togglePopup}
                    topDisplay={"Comments Section"}
                    width="50%"
                    right="calc(25% - 30px)"
                >
                    {allComments.length === 0
                        ? "No comments yet, be the first to comment"
                        : allComments}
                </Popup>
            )}
        </div>
    );
}
