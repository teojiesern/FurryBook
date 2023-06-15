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
import { Const } from "../../Const";
import { PostingRow } from "../../components/PostingRow";
import { Popup } from "../../Utils/Popup";
import { Postings } from "../../components/Postings";

export const StyledParentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
`;

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 10;
    width: 100%;
`;

export function ProfilePosts() {
    const [profilePic, datas] = useOutletContext();
    const [data, setData] = React.useState(useLoaderData());
    const [isOpen, setIsOpen] = React.useState(false);
    const { userId } = useParams();
    const [file, setFile] = React.useState(null);
    const currentLogin = localStorage.getItem("userId");
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
            `http://${Const}:3001/users/update/${data.id}`,
            updatedInfo
        );
        setData({ ...data, ...updatedInfo });
    }

    function togglePopup() {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    }

    function getDataFromChild(file) {
        setFile(file);
    }

    return (
        <StyledParentContainer>
            <UserInfo
                datas={data}
                friends={friends}
                submit={handleSubmission}
                userId={userId}
            />
            <PostContainer>
                {currentLogin === userId && (
                    <PostingRow
                        userId={userId}
                        profilePic={profilePic}
                        name={data.name}
                        togglePopup={togglePopup}
                        file={file}
                    />
                )}
                <Posts userId={userId} profilePic={profilePic} datas={data} />
            </PostContainer>
            {isOpen && (
                <Popup
                    handleClose={togglePopup}
                    topDisplay={"Upload something✌️✌️"}
                    width="65%"
                    height="95%"
                    right="calc(17% - 30px)"
                >
                    <Postings
                        userId={userId}
                        togglePopup={togglePopup}
                        getDataFromChild={getDataFromChild}
                    />
                </Popup>
            )}
        </StyledParentContainer>
    );
}
