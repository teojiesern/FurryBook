import React from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { UserInfo } from "../userProfilePage/UserInfo";
import { Posts } from "../Posts";

export const StyledParentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
`;

export function ProfilePosts() {
    const [profilePic, data] = useOutletContext();
    const { userId } = useParams();

    const friends =
        data.friendsId.length == 0
            ? "No Friends"
            : `${data.friendsId.length} Friends`;

    return (
        <StyledParentContainer>
            <UserInfo data={data} friends={friends} />
            <Posts userId={userId} profilePic={profilePic} data={data} />
        </StyledParentContainer>
    );
}
