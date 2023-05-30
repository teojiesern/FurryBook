import React from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import Friends from "./Friends";



const FriendsNav = () => {
  return (
    <div>
      <nav>
        <NavLink to="/friends" activeClassName="active">My Friends</NavLink>
        <NavLink to="/friend-recommendation" activeClassName="active">Friends Recommendation</NavLink>
      </nav>
      <Switch>
        <Route path="/friends" component={Friends} />
        <Route path="/friend-recommendation" component={Friends} />
      </Switch>
    </div>
  );
};

export default FriendsNav;