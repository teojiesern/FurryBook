import axios from "axios";
import React from "react";
import { styled } from "styled-components";
import { UserData } from "../../api/UserData";
import { Link } from "react-router-dom";
import { AcceptFriendRequest } from "../../api/AcceptFriendRequest";
import { DeclineFriendRequest } from "../../api/DeclineFriendRequest";
import { Const } from "../../Const";

const RequestContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 16px;
`;

const FriendRequests = styled.div`
    display: flex;
    font-family: "Montserrat", sans-serif;
    width: 100%;
    border-radius: 15px;
    padding: 16px;
    // margin-top: 15px;
    align-items: center;
    text-decoration: none;
`;

const Name = styled.div`
    font-size: 20px;
    color: #000000;
`;

const ProfilePicture = styled.div`
    height: 70px;
    width: 70px;
    background-size: cover;
    background-position: center;
    border-radius: 20%;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MutualFriends = styled.div`
    font-size: 16px;
    color: #808080;
`;

const StyledButton = styled.button`
    border: none;
    background-color: #153fac;
    color: white;
    padding: 7px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
`;

export function FriendRequest({ userData }) {
    const [mutual, setMutual] = React.useState([]);
    const [sentRequestUserData, setSentRequestUserData] = React.useState([]);
    const [accepted, setAccepted] = React.useState({});
    const [declined, setDeclined] = React.useState({});
    const requestOfUser = userData.receivedFriendRequests;

    React.useEffect(() => {
        const getMutual = async (id) => {
            const tempMutual = await axios.post(
                `http://${Const}:3001/users/mutual-friends`,
                {
                    senderId: id,
                    receiverId: userData.id,
                }
            );
            const tempUserData = await UserData(id);
            return { tempMutual: tempMutual.data, tempUserData };
        };

        const updateState = async () => {
            if (requestOfUser.length !== 0) {
                const results = await Promise.all(
                    requestOfUser.map((id) => getMutual(id))
                );
                setMutual(results.map((result) => result.tempMutual));
                setSentRequestUserData(
                    results.map((result) => result.tempUserData)
                );
            }
        };

        updateState();
    }, []);

    async function handleAccept(request) {
        const tempAccept = await AcceptFriendRequest(request);
        setAccepted((prevAccepted) => {
            return { ...prevAccepted, [request]: true };
        });
    }

    async function handleDecline(request) {
        const tempDecline = await DeclineFriendRequest(request);
        setDeclined((prevDeclined) => {
            return { ...prevDeclined, [request]: true };
        });
    }

    const allRequests =
        requestOfUser.length === 0 ? (
            <Name>No Friend Request for now</Name>
        ) : (
            requestOfUser.map((request, index) => {
                const profilePic = sentRequestUserData[
                    index
                ]?.profilePicturePath
                    ?.split("/")
                    .pop();
                return (
                    <FriendRequests key={request}>
                        <Link
                            to={`/FurryBook/profile/${request}`}
                            style={{ textDecoration: "none", display: "flex" }}
                        >
                            <ProfilePicture
                                style={{
                                    backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                                }}
                            ></ProfilePicture>
                            <div>
                                <Name>{sentRequestUserData[index]?.name}</Name>
                                {mutual[index]?.length > 0 ? (
                                    <MutualFriends>
                                        {mutual[index]?.length} mutual friends
                                    </MutualFriends>
                                ) : (
                                    <MutualFriends>
                                        No mutual friends
                                    </MutualFriends>
                                )}
                            </div>
                        </Link>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                marginLeft: "16%",
                            }}
                        >
                            <StyledButton
                                onClick={() => handleAccept(request)}
                                disabled={
                                    declined[request] || accepted[request]
                                }
                            >
                                {accepted[request] ? "Accepted" : "Accept"}
                            </StyledButton>
                            <StyledButton
                                style={{
                                    backgroundColor: "#e4e6eb",
                                    color: "black",
                                    marginTop: "5px",
                                }}
                                onClick={() => handleDecline(request)}
                                disabled={
                                    declined[request] || accepted[request]
                                }
                            >
                                {declined[request] ? "Declined" : "Decline"}
                            </StyledButton>
                        </div>
                    </FriendRequests>
                );
            })
        );
    return <RequestContainer>{allRequests}</RequestContainer>;
}
