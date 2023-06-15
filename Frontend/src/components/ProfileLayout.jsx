import React, { useEffect } from "react";
import {
    Link,
    Outlet,
    useLoaderData,
    useLocation,
    useOutletContext,
    useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";
import { Nav } from "react-bootstrap";
import { StyledContainer } from "../Utils/StyledContainer";
import { UserData } from "../api/UserData";
import { GetFriendshipStatus } from "../api/GetFriendshipStatus";
import { SendFriendRequest } from "../api/SendFriendRequest";
import { AcceptFriendRequest } from "../api/AcceptFriendRequest";
import { DeclineFriendRequest } from "../api/DeclineFriendRequest";
import { Popup } from "../Utils/Popup";
import DragDrop from "./DragDrop";
import { MutualFriends } from "../api/MutualFriends";
import { FriendListContainer } from "../pages/Friends/Friends";

const StyledUserInfoContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: 70vh;
    background-color: white;
    margin: 20px 40px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledBackgroundCoverPhoto = styled.div`
    flex: 7;
    background-size: cover;
    background-position: center;
    border-radius: 30px 30px 0 0;
    border: none;
`;

const StyledProfilePicture = styled.div`
    position: absolute;
    top: 48%;
    left: 40px;
    width: 220px;
    height: 220px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
`;

const StyledUserDetailContainer = styled.div`
    flex: 3;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px 350px;
    font-family: "Montserrat", sans-serif;
`;

const StyledUserContainer = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
`;

const StyledName = styled.h4`
    margin-left: 3px;
    margin-right: 10px;
    margin-bottom: 0;
`;

const StyledFriendCount = styled.h4`
    margin: 0;
    margin-top: 5px;
    color: gray;
`;

const StyledNavigationContainer = styled.div`
    display: flex;
    padding: 20px 80px;
    justify-content: space-between;
    height: 60px;
    margin: 0 40px;
    border-radius: 30px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledNavigation = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledSearchBar = styled.input`
    border: none;
    padding: 10px;
    border-bottom: 1px solid black;
    outline: none;
    height: 100%;
    font-family: "Montserrat", sans-serif;
`;

const StyledNavLink = styled(Nav.Link)`
    display: flex;
    align-items: center;
    color: #b1c6fb;
    font-family: "Montserrat", sans-serif;
    text-decoration: none;
    margin: 0 60px 0 0;
    font-weight: bold;

    :hover {
        color: #b1c6fb;
    }
`;

const activeStyle = {
    color: "#153FAC",
};

const FriendStatus = styled.button`
    border: none;
    border-radius: 10px;
    margin-top: 10px;
    background-color: #153fac;
    color: white;
    padding: 10px 20px;
`;

const CustomNavLink = ({ to, children }) => {
    const location = useLocation();
    const decodedPathname = decodeURIComponent(location.pathname);
    const isActive = decodedPathname === to;
    return (
        <StyledNavLink as={Link} to={to} style={isActive ? activeStyle : {}}>
            {children}
        </StyledNavLink>
    );
};

export function ProfileLayout() {
    const [datas, setDatas] = React.useState(useLoaderData());
    const [friendshipStatus, setFriendshipStatus] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);
    const [mutualFriends, setMutualFriends] = React.useState([]);
    const [isMutualPopup, setIsMutualPopup] = React.useState(false);
    const [type, setType] = React.useState("");
    const { userId } = useParams();
    const ownId = localStorage.getItem("userId");
    const backgroundPhoto = datas.coverPhotoPath?.split("/").pop();
    const profilePic = datas.profilePicturePath?.split("/").pop();
    const url = useLocation().pathname.split("/").slice(0, 3).join("/");
    const friends =
        datas.friendsId.length == 0
            ? "No Friends"
            : `${datas.friendsId.length} Friends`;

    useEffect(() => {
        const getProfData = async () => {
            const temp = await UserData(userId);
            setDatas(temp);
        };

        const getFriendshipStatus = async () => {
            const temp = await GetFriendshipStatus(userId);
            setFriendshipStatus(temp);
        };

        const getMutualFriend = async () => {
            if (userId !== ownId) {
                const temp = await MutualFriends(userId, ownId);
                setMutualFriends(temp);
            }
            return null;
        };

        getMutualFriend();
        getFriendshipStatus();
        getProfData();
        setIsMutualPopup(false);
    }, [userId]);

    const friendDataWithMutualCount = React.useMemo(() => {
        return mutualFriends?.map((friend) => ({
            ...friend,
            mutualFriends: friend.mutualFriends.length,
        }));
    }, [mutualFriends]);

    async function handleClick() {
        if (friendshipStatus === "Add Friend") {
            const temp = await SendFriendRequest(userId);
            setFriendshipStatus("Friend request sent");
        } else {
            const tempAccept = await AcceptFriendRequest(userId);
            setFriendshipStatus("friends");
        }
    }

    async function handleDecline() {
        const tempDecline = await DeclineFriendRequest(userId);
        setFriendshipStatus("Add Friend");
    }

    function togglePopup() {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    return (
        <StyledContainer>
            <StyledUserInfoContainer>
                <StyledBackgroundCoverPhoto
                    style={{
                        backgroundImage: `url("/assets/background photos/${backgroundPhoto}")`,
                    }}
                ></StyledBackgroundCoverPhoto>
                <StyledProfilePicture
                    style={{
                        backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                    }}
                ></StyledProfilePicture>
                <StyledUserDetailContainer>
                    <StyledUserContainer>
                        <StyledName>{datas.name}</StyledName>
                        <IoSettingsSharp />
                    </StyledUserContainer>
                    <div style={{ display: "flex" }}>
                        <StyledFriendCount>{friends}</StyledFriendCount>
                        {userId !== ownId && (
                            <StyledFriendCount
                                style={{
                                    margin: "0 10px",
                                    fontSize: "50px",
                                    lineHeight: "0.2",
                                }}
                            >
                                .
                            </StyledFriendCount>
                        )}
                        {userId !== ownId && (
                            <button
                                style={{
                                    backgroundColor: "transparent",
                                    border: "none",
                                    margin: "none",
                                }}
                                disabled={mutualFriends.length === 0}
                                onClick={() => setIsMutualPopup(true)}
                            >
                                <StyledFriendCount>
                                    {mutualFriends.length === 0
                                        ? "No "
                                        : mutualFriends.length + " "}
                                    Mutual Friends
                                </StyledFriendCount>
                            </button>
                        )}
                    </div>
                    {userId === ownId ? (
                        <div>
                            <FriendStatus
                                onClick={() => {
                                    togglePopup();
                                    setType("profile");
                                }}
                            >
                                Edit Profile Pic
                            </FriendStatus>
                            <FriendStatus
                                onClick={() => {
                                    togglePopup();
                                    setType("cover");
                                }}
                                style={{ marginLeft: "20px" }}
                            >
                                Edit Cover Photo
                            </FriendStatus>
                        </div>
                    ) : (
                        <div>
                            <FriendStatus
                                disabled={
                                    friendshipStatus === "friends" ||
                                    friendshipStatus === "Friend request sent"
                                }
                                onClick={handleClick}
                            >
                                {friendshipStatus}
                            </FriendStatus>
                            {friendshipStatus === "Accept" ? (
                                <FriendStatus
                                    disabled={
                                        friendshipStatus === "friends" ||
                                        friendshipStatus ===
                                            "Friend request sent"
                                    }
                                    onClick={handleDecline}
                                    style={{ marginLeft: "20px" }}
                                >
                                    Decline
                                </FriendStatus>
                            ) : null}
                        </div>
                    )}
                </StyledUserDetailContainer>
            </StyledUserInfoContainer>

            <StyledNavigationContainer>
                <StyledNavigation>
                    <CustomNavLink as={Link} to={`${url}/${datas.id}`}>
                        Posts
                    </CustomNavLink>
                    <CustomNavLink as={Link} to={`${url}/${datas.id}/friends`}>
                        Friends
                    </CustomNavLink>
                    <CustomNavLink as={Link} to={`${url}/${datas.id}/photos`}>
                        Photos
                    </CustomNavLink>
                </StyledNavigation>
                <StyledSearchBar
                    type="search"
                    placeholder="Search"
                ></StyledSearchBar>
            </StyledNavigationContainer>
            <Outlet context={[profilePic, datas]} />
            {isOpen && (
                <Popup
                    handleClose={togglePopup}
                    topDisplay={
                        type === "profile"
                            ? "Edit Your Profile Picture✌️✌️"
                            : "Edit your Cover Photo✌️✌️"
                    }
                    width="65%"
                    height="95%"
                    right="calc(17% - 30px)"
                >
                    <DragDrop changeType={type} userId={userId} />
                </Popup>
            )}
            {isMutualPopup && (
                <Popup
                    handleClose={() => setIsMutualPopup(false)}
                    topDisplay={"Mutual Friends"}
                    width="65%"
                    height="auto"
                    right="calc(17% - 30px)"
                >
                    <FriendListContainer friends={friendDataWithMutualCount} />
                </Popup>
            )}
        </StyledContainer>
    );
}
