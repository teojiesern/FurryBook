import React from "react";
import { styled } from "styled-components";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GiLovers } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { Popup } from "../../Utils/Popup";

const StyledParentContainer = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
`;

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

const changeStyle = {
    margin: "20px 0 50px 40px",
    color: "gray",
    fontFamily: "Montserrat, sans-serif",
};

const iconStyle = {
    marginRight: "5px",
};

export function UserInfo({ data, friends }) {
    const [isOpen, setIsOpen] = React.useState(false);
    const [details, setDetails] = React.useState([]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    function toggleDetails(data) {
        setIsComment(false);
    }

    return (
        <div style={{ width: "30%" }}>
            <StyledPostContainer style={changeStyle}>
                <StyledName style={{ marginBottom: "25px" }}>Intro</StyledName>
                <StyledInfosContainer>
                    <MdOutlineDriveFileRenameOutline style={iconStyle} />
                    <StyledInfo>{data.name}</StyledInfo>
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
                    <StyledInfo>{data.email}</StyledInfo>
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
                        toggleDetails(data);
                    }}
                >
                    Edit Details
                </StyledEditButton>
            </StyledPostContainer>

            {isOpen && (
                <Popup
                    content={details}
                    handleClose={togglePopup}
                    top={"Edit Your Profile"}
                />
            )}
        </div>
    );
}
