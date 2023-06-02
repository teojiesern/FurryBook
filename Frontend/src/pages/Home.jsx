import React from "react";
import { StyledContainer } from "../Utils/StyledContainer";
import { Form, useLoaderData, useLocation } from "react-router-dom";
import { getTimeCreated } from "../Utils/getTimeCreated";
import { styled } from "styled-components";
import { ReadMore } from "../Utils/ReadMore";
import Masonry from "@mui/lab/Masonry/Masonry";
import { FriendsData } from "../api/Friends";
import { BiLike, BiComment } from "react-icons/bi";
import { TbShare3 } from "react-icons/tb";
import { LikePosts } from "../api/LikePosts";
import { Popup } from "../Utils/Popup";
import { UserData } from "../api/UserData";
import { TrackSession } from "../api/trackSession";

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

const InformationContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 80%;
    padding: 2px 0;
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

const StyledProfilePicture = styled.div`
    height: 70px;
    width: 70px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
    margin-right: 20px;
`;

const StyledPosted = styled.p`
    margin: 0;
    font-size: 15px;
    color: gray;
`;

const StyledLikedAndCommented = styled.div`
    display: flex;
    justify-content: space-between;
    color: gray;
`;

const StyledLikeAndCommentCount = styled.p`
    color: gray;
    fontfamily: "Montserrat, sans-serif";
    font-size: 15px;
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

const StyledCommentsContainer = styled.div`
    display: flex;
    width: 75%;
    border-radius: 20px;
    background-color: white;
    margin: 20px auto 0 auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 10px;
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

const commentContainerStyle = {
    padding: "20px",
    marginBottom: "0",
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

const likeStyle = {
    color: "blue",
};

export function Home() {
    const [data, setData] = React.useState(useLoaderData());
    const [friendsData, setFriendsData] = React.useState([]);
    const [isOpen, setIsOpen] = React.useState(false);
    const [allComments, setAllComments] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const currentUser = localStorage.getItem("userId");
    const session = useLocation().pathname;

    React.useEffect(() => {
        const getFriendsData = async () => {
            const temp = await FriendsData(currentUser);
            const tempSession = await TrackSession(session);
            setFriendsData(temp);
        };

        getFriendsData();
    }, []);

    async function toggleComments(comments) {
        if (comments.length !== 0) {
            const listOfComments = await Promise.all(
                comments.map(async (c) => {
                    const displayTime = getTimeCreated(c);
                    const user = await UserData(c.userId);
                    const profilePic = user.profilePicturePath
                        ?.split("/")
                        .pop();
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

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    const updateComments = (postId, val) => {
        const now = new Date();
        setData((prevData) =>
            prevData.map((a) => {
                if (a.id === postId) {
                    a.comments.unshift({
                        body: val,
                        userId: currentUser,
                        id: 2,
                        created: now.toISOString(),
                    });
                }
                return a;
            })
        );
    };

    const allPosts = data?.map((post) => {
        const displayTime = getTimeCreated(post);
        const user = friendsData?.find(
            (friends) => friends.friend.id === post.userId
        )?.friend;
        const profilePic = user?.profilePicturePath?.split("/").pop();

        const handleLike = async (postId) => {
            await LikePosts(postId);
            const updatedPosts = data.map((post) => {
                if (post.id === postId) {
                    const newLikes = [...post.likes, currentUser];
                    const removedLikes = post.likes.filter(
                        (like) => like !== currentUser
                    );
                    if (post.likes.indexOf(currentUser) === -1) {
                        return { ...post, likes: newLikes };
                    }
                    return { ...post, likes: removedLikes };
                }
                return post;
            });
            setData(updatedPosts);
        };

        function handleShare() {}
        return (
            <UserCard key={post.id}>
                <InformationContainer>
                    <div style={{ flex: "2" }}>
                        <StyledProfilePicture
                            style={{
                                backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                            }}
                        ></StyledProfilePicture>
                    </div>
                    <div
                        style={{
                            flex: 8,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div>
                            <StyledName>{user?.name}</StyledName>
                        </div>
                        <div>
                            <StyledPosted>{displayTime}</StyledPosted>
                        </div>
                        <div>
                            {post.caption ? (
                                <StyledCaption>
                                    <ReadMore maxLines={5}>
                                        {post.caption}
                                    </ReadMore>
                                </StyledCaption>
                            ) : null}
                        </div>
                        <div>
                            {post.filePath ? (
                                post.filePath.endsWith(".mp4") ? (
                                    <video
                                        src={`/assets/post storage/${post.name}`}
                                        loop
                                        controls
                                        style={{
                                            height: "90%",
                                            width: "80%",
                                            borderRadius: "10px",
                                        }}
                                    ></video>
                                ) : (
                                    <StyledPost
                                        style={{
                                            backgroundImage: `url("/assets/post storage/${post.name}")`,
                                            borderRadius: "10px",
                                        }}
                                    ></StyledPost>
                                )
                            ) : null}
                        </div>
                    </div>
                </InformationContainer>
                <div style={{ width: "80%", marginTop: "20px" }}>
                    <StyledLikedAndCommented>
                        {post.likes?.length == 0
                            ? "Be the first one to like this post"
                            : `${post.likes?.length} users liked this post`}
                        <StyledLikeAndCommentCount
                            style={{ cursor: "pointer" }}
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
                                post.likes.indexOf(currentUser) !== -1
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
                            <StyledInteractionText>
                                Comment
                            </StyledInteractionText>
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
                            onChange={(e) => setInputValue(e.target.value)}
                        ></input>
                        <button
                            style={submitButtonStyle}
                            onClick={() => updateComments(post.id, inputValue)}
                            disabled={inputValue === ""}
                        >
                            Comment
                        </button>
                    </Form>
                </div>
            </UserCard>
        );
    });

    return (
        <StyledContainer>
            {data.length === 0 ? (
                <p>Add friends to see more posts</p>
            ) : (
                <Masonry columns={2} spacing={2} sx={{ paddingLeft: "20px" }}>
                    {allPosts}
                </Masonry>
            )}
            <div>
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
        </StyledContainer>
    );
}
