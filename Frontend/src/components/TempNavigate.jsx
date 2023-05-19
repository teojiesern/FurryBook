import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export function TempNavigate(){
    return (
        <div className="tempthing">
            <Link to="/FurryBook">home</Link>
            <Link to="/FurryBook/login">login</Link>
            <Link to="/FurryBook/signup">signup</Link>
            <Link to="/FurryBook/someone">profile</Link>
            <Link to="/FurryBook/someone/settings">settings</Link>
            <Link to="/FurryBook/someone/friends">friends</Link>
        </div>
    )
}