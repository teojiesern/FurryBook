import React from "react";
import {
    useLoaderData,
    useLocation,
    useOutletContext,
    useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { UserInfo } from "../userProfilePage/UserInfo";
import { Posts } from "../Posts";
import axios from "axios";
import { TrackSession } from "../../api/trackSession";

export const StyledParentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
`;

export function ProfilePosts() {
    const [profilePic, datas] = useOutletContext();
    const [data, setData] = React.useState(useLoaderData());
    const { userId } = useParams();
    const session = useLocation().pathname;

    React.useEffect(() => {
        const tracking = async () => {
            const tempSession = await TrackSession(session);
        };

        tracking();
    }, []);

    const friends =
        data.friendsId.length == 0
            ? "No Friends"
            : `${data.friendsId.length} Friends`;

    async function handleSubmission(e, hob, hobUpdates, jobUpdate, allJobs) {
        e.preventDefault();

        const updatedInfo = {
            name: e.target.elements.name.value,
            gender: e.target.elements.gender.value,
            phoneNumber: e.target.elements.phoneNumber.value,
            relationshipStatus: e.target.elements.relationshipStatus.value,
            birthDate: e.target.elements.birthDate.value,
            location: e.target.elements.location.value,
            hobbies: hob,
            hobbiesUpdates: hobUpdates,
            jobUpdates: jobUpdate,
            jobs: allJobs,
        };

        const response = await axios.put(
            `http://localhost:3001/users/update/${data.id}`,
            updatedInfo
        );
        setData({ ...data, ...updatedInfo });
        // window.location.reload();
    }

    return (
        <StyledParentContainer>
            <UserInfo
                datas={data}
                friends={friends}
                submit={handleSubmission}
                userId={userId}
            />
            <Posts userId={userId} profilePic={profilePic} datas={data} />
        </StyledParentContainer>
    );
}
