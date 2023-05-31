import React from "react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import { RiProfileFill } from "react-icons/ri";
import { IoSettingsSharp, IoLogOut } from "react-icons/io5";

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 80vw;
    margin-top: 30px;
    margin-bottom: 40px;
`;

const StyledSearchBar = styled.input`
    border: none;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), -10px 0 #153fac;
    height: 50px;
    width: 300px;
    transition: all 0.2s ease-out;
    outline: none;
    margin-left: 244px;

    &::placeholder {
        text-align: center;
    }

    &:hover {
        transform: scale(1.025);
        transition: all 0.1s ease-out;
    }
`;

const StyledDropdown = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30px;
    right: 100px;
`;

const StyledPrimaryChoice = styled.div`
    width: 180px;
    height: 50px;
    border-radius: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background-color: white;
    display: flex;
    cursor: pointer;
    margin-left: auto;
    margin-bottom: 5px;
    transition: all 0.2s ease-out;

    &:hover {
        transform: scale(1.025);
        transition: all 0.1s ease-out;
    }
`;

const StyledProfilePic = styled.div`
    border-radius: 100px;
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center;
    margin-right: 10px;
`;

const StyledUserInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 50px;
    justify-content: center;
    align-self: flex-end;
`;

const StyledUserInfo = styled.h3`
    font-size: 13px;
    color: #153fac;
    margin: 0;
`;

const StyledOption = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 17px;
    text-decoration: none;
    color: black;
`;

const StyledOptionContainer = styled.div`
    width: 300px;
    background-color: white;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    z-index: 9999;
`;

const StyledLeftPortion = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const searchIconStyle = {
    position: "absolute",
    top: "47px",
    right: "38vw",
};

const marginRightStyle = {
    marginRight: "10px",
};

const StyledLogo = styled.div`
    color: #153fac;
    font-family: "Inter", sans-serif;
    margin-left: 30px;
    font-size: 30px;
    text-decoration: none;
`;

export function OwnLayout() {
    const [styling, setStyling] = React.useState("none");
    const data = useLoaderData();
    const bgImg = data.profilePicturePath?.split("/").pop();

    function handleClick() {
        setStyling((prevStyle) => (prevStyle === "none" ? "" : "none"));
    }

    function handleLogout() {
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedIn");
        window.location.reload();
    }

    return (
        <div>
            <StyledDiv>
                <StyledLogo as={Link} to="/FurryBook">
                    FurryBook
                </StyledLogo>
                <div style={{ margin: "auto" }}>
                    <StyledSearchBar type="search" placeholder="Search..." />
                    <div>
                        <BiSearch style={searchIconStyle} />
                    </div>
                </div>
                <StyledDropdown>
                    <StyledPrimaryChoice onClick={handleClick}>
                        <StyledProfilePic
                            style={{
                                backgroundImage: `url("/assets/profile pictures/${bgImg}")`,
                            }}
                        ></StyledProfilePic>
                        <StyledUserInfoDiv>
                            <StyledUserInfo>{data.name}</StyledUserInfo>
                            <StyledUserInfo>{data.userType}</StyledUserInfo>
                        </StyledUserInfoDiv>
                    </StyledPrimaryChoice>
                    <StyledOptionContainer style={{ display: styling }}>
                        <StyledOption
                            as={Link}
                            to={`/FurryBook/own/${data.name}`}
                            onClick={handleClick}
                        >
                            <StyledLeftPortion>
                                <RiProfileFill style={marginRightStyle} />
                                Profile
                            </StyledLeftPortion>
                            &rarr;
                        </StyledOption>
                        <StyledOption
                            as={Link}
                            to={`/FurryBook/settings`}
                            onClick={handleClick}
                        >
                            <StyledLeftPortion>
                                <IoSettingsSharp style={marginRightStyle} />
                                Settings
                            </StyledLeftPortion>
                            &rarr;
                        </StyledOption>
                        <StyledOption onClick={handleLogout}>
                            <StyledLeftPortion>
                                <IoLogOut style={marginRightStyle} />
                                Logout
                            </StyledLeftPortion>
                            &rarr;
                        </StyledOption>
                    </StyledOptionContainer>
                </StyledDropdown>
            </StyledDiv>
            <Outlet context={data} />
        </div>
    );
}
