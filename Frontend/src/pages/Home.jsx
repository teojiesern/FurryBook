import React from "react";
import { Posts } from "./Posts";
import { StyledContainer } from "../Utils/StyledContainer";

export function Home() {
    return (
        <StyledContainer>
            <Posts
                userId="6469c1f18a4b1a29f059f93e"
                profilePic={"Screenshot 2023-02-07 115415.png"}
                data={{
                    id: "6469c1f18a4b1a29f059f93e",
                    name: "teo jie sern",
                    email: "js@gmail.com",
                    password: "123",
                    gender: "male",
                    phoneNumber: null,
                    relationshipStatus: null,
                    birthDate: null,
                    age: 20,
                    userType: "user",
                    profilePicturePath:
                        "C:/Users/User/Documents/WIA1002 DS/FurryBook/Frontend/public/assets/profile pictures/Screenshot 2023-02-07 115415.png",
                    coverPhotoPath:
                        "C:/Users/User/Documents/WIA1002 DS/FurryBook/Frontend/public/assets/background photos/Screenshot 2022-11-24 133316.png",
                    hobbies: [],
                    jobs: [],
                    friendsId: [],
                }}
            />
        </StyledContainer>
    );
}
