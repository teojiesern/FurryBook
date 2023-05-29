import React, { useEffect } from "react";
import {
    Link,
    Outlet,
    useLocation,
    useOutletContext,
    useMatch,
    useParams,
} from "react-router-dom";
import { styled } from "styled-components";
import { IoSettingsSharp } from "react-icons/io5";
import { Nav } from "react-bootstrap";
import { StyledContainer } from "../Utils/StyledContainer";
import { AllPosts } from "../api/AllPosts";
import { Search } from "../api/Search";
import { UserData } from "../api/UserData";

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
    const [datas, setDatas] = React.useState(useOutletContext());
    const { userId } = useParams();
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

        getProfData();
    }, [userId]);
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
                    <StyledFriendCount>{friends}</StyledFriendCount>
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
                    // onKeyUp={async (e) => {
                    //     const res = await Search(e.target.value);
                    //     console.log(res);
                    // }}
                ></StyledSearchBar>
            </StyledNavigationContainer>
            <Outlet context={[profilePic, datas]} />
        </StyledContainer>
    );
}
