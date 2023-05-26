import React from "react";
import { styled } from "styled-components";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GiLovers } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { Popup } from "../../Utils/Popup";
import { Form } from "react-router-dom";

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 20px 40px 50px 40px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 20px 40px;
`;

const StyledName = styled.h1`
    margin: 0;
    font-size: 30px;
`;

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

const StyledProfilePicture = styled.div`
    height: 200px;
    width: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
    margin-right: 20px;
    margin-bottom: 10%;
`;

const StyledCoverPhoto = styled.div`
    height: 30vh;
    width: 90%;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    margin: 10px 20px 10% 0;
`;

const StyledEditDetailContainer = styled.div`
    display: flex;
    margin: 10px;
    justify-content: space-between;
`;

const StyledProfAndCover = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 3;
`;

const StyledInformationContainer = styled.div`
    display: grid;
    grid-template-columns: 60px 60px;
    flex: 6;
`;

const StyledDividerContainer = styled.div`
    display: flex;
    justify-content: center;
    flex: 0.5;
`;

const StyledDividerLine = styled.div`
    height: 100%;
    width: 1.3px;
    background-color: gray;
`;

const StyledEditProfileAndCover = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

const StyledChangeText = styled.h4`
    font-size: 20px;
    font-family: Montserrat, sans-serif;
    color: #153fac;
    margin: 0;
    cursor: pointer;
`;

const StyledDescription = styled.h1`
    font-size: 20px;
    margin: 0;
`;

const changeStyle = {
    margin: "20px 0 50px 40px",
    color: "gray",
};

const iconStyle = {
    marginRight: "5px",
};

const fakeIconStyle = {
    width: "7%",
    marginRight: "5px",
};

const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    flex: 6,
};

export function UserInfo({ data, friends }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [details, setDetails] = React.useState([]);
    const profilePic = data.profilePicturePath.split("/").pop();
    const coverPhoto = data.coverPhotoPath.split("/").pop();

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    function toggleDetails() {
        const detailOfUser = (
            <StyledEditDetailContainer>
                <StyledProfAndCover>
                    <StyledEditProfileAndCover>
                        <StyledDescription>Profile Picture</StyledDescription>
                        <StyledChangeText>Change</StyledChangeText>
                    </StyledEditProfileAndCover>
                    <StyledProfilePicture
                        style={{
                            backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                        }}
                    ></StyledProfilePicture>
                    <StyledEditProfileAndCover>
                        <StyledDescription>Cover Photo</StyledDescription>
                        <StyledChangeText>Change</StyledChangeText>
                    </StyledEditProfileAndCover>
                    <StyledCoverPhoto
                        style={{
                            backgroundImage: `url("/assets/background photos/${coverPhoto}")`,
                        }}
                    ></StyledCoverPhoto>
                </StyledProfAndCover>
                <StyledDividerContainer>
                    <StyledDividerLine></StyledDividerLine>
                </StyledDividerContainer>
                <Form method="post" style={formStyle}>
                    <div>
                        <StyledDescription>Full Name</StyledDescription>
                        <input type="text" />
                    </div>
                    <div>
                        <StyledDescription>Birth Date</StyledDescription>
                        <input type="date" />
                    </div>
                    <div>
                        <StyledDescription>Phone Number</StyledDescription>
                        <input type="tel" />
                    </div>
                    <div>
                        <StyledDescription>Full Name</StyledDescription>
                        <input type="" />
                    </div>
                </Form>
            </StyledEditDetailContainer>
        );
        setDetails(detailOfUser);
    }

    return (
        <div style={{ width: "30%", fontFamily: "Montserrat, sans-serif" }}>
            <StyledPostContainer style={changeStyle}>
                <StyledName style={{ marginBottom: "25px" }}>Intro</StyledName>
                <StyledInfosContainer>
                    <MdOutlineDriveFileRenameOutline style={iconStyle} />
                    <StyledInfo>{data.name}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <img src="/assets/age.png" style={fakeIconStyle} />
                    <StyledInfo>{data.age}</StyledInfo>
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
                    <StyledInfo>{data.birthDate}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <GiLovers style={iconStyle} />
                    <StyledInfo>
                        {data.relationshipStatus == null
                            ? "prefer not to say"
                            : data.relationshipStatus}
                    </StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <FaUserFriends style={iconStyle} />
                    <StyledInfo>{friends}</StyledInfo>
                </StyledInfosContainer>
                <StyledEditButton
                    onClick={() => {
                        togglePopup();
                        toggleDetails();
                    }}
                >
                    Edit Details
                </StyledEditButton>
            </StyledPostContainer>

            {isOpen && (
                <Popup
                    content={details}
                    handleClose={togglePopup}
                    topDisplay={"Edit Your Profile"}
                    width="85%"
                    right="calc(8% - 30px)"
                />
            )}
        </div>
    );
}
