import { Nav } from "react-bootstrap";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends } from "react-icons/fa";
import { RiProfileFill, RiSettings3Fill, RiAdminFill } from "react-icons/ri";

const StyledLogo = styled.div`
    color: #153fac;
    font-family: "Inter", sans-serif;
    margin: 30px 30px 100px 30px;
    font-size: 30px;
    text-decoration: none;
`;

const StyledNav = styled(Nav)`
    background-color: #fff;
    color: #153fac;
    height: 100%;
    font-size: 20px;
`;

const StyledNavLink = styled(Nav.Link)`
    display: flex;
    align-items: center;
    color: #b1c6fb;
    font-family: "Montserrat", sans-serif;
    font-weight: 300;
    text-decoration: none;
    margin: 15px 30px;
    width: 10%;

    :hover {
        color: #b1c6fb;
    }
`;

const activeStyle = {
    color: "#153FAC",
    fontWeight: 400,
};

const CustomNavLink = ({ to, children }) => {
    const location = useLocation();
    const decodedPathname = decodeURIComponent(location.pathname);
    const isActive =
        decodedPathname?.split("/").slice(0, 4).join("/") ===
        to?.split("/")?.slice(0, 4).join("/");

    return (
        <StyledNavLink as={Link} to={to} style={isActive ? activeStyle : {}}>
            {children}
        </StyledNavLink>
    );
};

CustomNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
};

const Icon = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-right: 10px;
`;

export function Navbar() {
    const userData = useLoaderData();
    return (
        <StyledNav defaultActiveKey="/FurryBook" className="flex-column">
            <StyledLogo as={Link} to="/FurryBook">
                FurryBook
            </StyledLogo>
            <CustomNavLink as={Link} to="/FurryBook">
                <Icon>
                    <AiFillHome />
                </Icon>
                Home
            </CustomNavLink>
            <CustomNavLink as={Link} to={`/FurryBook/profile/${userData.id}`}>
                <Icon>
                    <RiProfileFill />
                </Icon>
                Profile
            </CustomNavLink>
            <CustomNavLink as={Link} to={`/FurryBook/friends/${userData.id}`}>
                <Icon>
                    <FaUserFriends />
                </Icon>
                Friends
            </CustomNavLink>
            <CustomNavLink as={Link} to={`/FurryBook/settings`}>
                <Icon>
                    <RiSettings3Fill />
                </Icon>
                Settings
            </CustomNavLink>
            {userData.userType === "admin" ? (
                <CustomNavLink as={Link} to={`/FurryBook/adminPage`}>
                    <Icon>
                        <RiAdminFill />
                    </Icon>
                    Admin
                </CustomNavLink>
            ) : null}
        </StyledNav>
    );
}
