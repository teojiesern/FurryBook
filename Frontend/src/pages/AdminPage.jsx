import React from "react";
import { redirect, useLoaderData } from "react-router-dom";
import { styled } from "styled-components";
import { StyledContainer } from "../Utils/StyledContainer";
import { AdminDeleteUser } from "../api/AdminDeleteUser";

const CardContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 20px;
    padding: 20px;
`;

const StyledProfilePicture = styled.div`
    height: 100px;
    width: 100px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
`;

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

const StyledDividerLine = styled.div`
    width: 80%;
    margin: 20px 0;
    height: 1.3px;
    background-color: gray;
`;

const Value = styled.div`
    font-size: 16px;
    color: #50577a;
    margin: 0;
    margin-left: 10px;
`;

const Key = styled.h2`
    display: inline;
    font-size: 18px;
    color: black;
    margin: 0;
`;

const InformationContainer = styled.div`
    display: flex;
    width: 80%;
    padding: 0 20px;
    align-items: center;
`;

const StyledButton = styled.button`
    border: none;
    background-color: #153fac;
    color: white;
    padding: 13px 25px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 600;
`;

export function AdminPage() {
    const [allUsers, setAllUsers] = React.useState(useLoaderData());

    async function handleDeleteUser(userId) {
        const temp = await AdminDeleteUser(userId);
        setAllUsers((prevUsers) =>
            prevUsers.filter((user) => user.id != userId)
        );
    }

    const usersInDB = allUsers.map((user) => {
        const profilePic = user.profilePicturePath?.split("/").pop();
        return (
            <UserCard key={user.id}>
                <StyledProfilePicture
                    style={{
                        backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                    }}
                />
                <StyledDividerLine />
                <InformationContainer>
                    <Key>Name: </Key>
                    <Value>{user.name}</Value>
                </InformationContainer>
                <InformationContainer>
                    <Key>Email: </Key>
                    <Value>{user.email}</Value>
                </InformationContainer>
                <InformationContainer>
                    <Key>Age: </Key>
                    <Value>{user.age}</Value>
                </InformationContainer>
                <InformationContainer>
                    <Key>State: </Key>
                    <Value>{user.location}</Value>
                </InformationContainer>
                <InformationContainer>
                    <Key>Friend Count: </Key>
                    <Value>{user.friendsId.length}</Value>
                </InformationContainer>
                <InformationContainer
                    style={{
                        justifyContent: "space-around",
                        marginTop: "20px",
                    }}
                >
                    <StyledButton
                        style={{ color: "black", backgroundColor: "#e4e6eb" }}
                        onClick={() => handleDeleteUser(user.id)}
                    >
                        Delete User
                    </StyledButton>
                    <StyledButton
                        onClick={() =>
                            (window.location.href = `/FurryBook/adminPage/${user.id}`)
                        }
                    >
                        View Posts
                    </StyledButton>
                </InformationContainer>
            </UserCard>
        );
    });
    return (
        <StyledContainer>
            <CardContainer>{usersInDB}</CardContainer>;
        </StyledContainer>
    );
}
