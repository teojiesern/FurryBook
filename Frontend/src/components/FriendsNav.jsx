import React from "react";
import { Nav } from "react-bootstrap";
import {
    Link,
    NavLink,
    Outlet,
    useLoaderData,
    useLocation,
    useParams,
} from "react-router-dom";
import { styled } from "styled-components";

const navContainerStyle = {
    display: "flex",
    fontFamily: "Montserrat, sans-serif",
    justifyContent: "space-around",
    backgroundColor: "white",
    padding: "2vh 0",
    margin: "0 2vw",
    borderRadius: "10px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

const activeStyle = {
    fontSize: "17px",
    textDecoration: "none",
    fontWeight: "bold",
};

const StyledNavLink = styled(Nav.Link)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: "Montserrat", sans-serif;
    font-weight: 400;
    text-decoration: none;
    width: 20%;
`;

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

const FriendsNav = () => {
    const userId = useParams().userId;
    const userData = useLoaderData();

    return (
        <div>
            <nav style={navContainerStyle}>
                <CustomNavLink
                    to={`/FurryBook/friends/${userId}`}
                >
                    My Friends
                </CustomNavLink>
                <CustomNavLink
                    to={`/FurryBook/friends/${userId}/recommendation`}
                >
                    People you might know
                </CustomNavLink>
            </nav>
            <Outlet context={userData} />
        </div>
    );
};

export default FriendsNav;
