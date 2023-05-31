import React from "react";
import { NavLink, Outlet, useLoaderData, useParams } from "react-router-dom";

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

const navLinkStyle = {
    textDecoration: "none",
    fontSize: "17px",
};

const activeStyle = {
    fontSize: "17px",
    textDecoration: "none",
    fontWeight: "bold",
};

const FriendsNav = () => {
    const userId = useParams().userId;
    const [friend, setFriend] = React.useState(true);
    const userData = useLoaderData();

    return (
        <div>
            <nav style={navContainerStyle}>
                <NavLink
                    to={`/FurryBook/friends/${userId}`}
                    activeClassName="active"
                    style={friend ? activeStyle : navLinkStyle}
                    onClick={() => setFriend(true)}
                >
                    My Friends
                </NavLink>
                <NavLink
                    to={`/FurryBook/friends/${userId}/recommendation`}
                    activeClassName="active"
                    style={friend ? navLinkStyle : activeStyle}
                    onClick={() => setFriend(false)}
                >
                    People you might know
                </NavLink>
            </nav>
            <Outlet context={userData}/>
        </div>
    );
};

export default FriendsNav;
