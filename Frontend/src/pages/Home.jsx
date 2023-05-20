import React from "react";

export function Home() {
    function handleClick() {
        localStorage.removeItem("userId");
        localStorage.removeItem("loggedIn");
        window.location.reload();
    }

    return (
        <div>
            <h1></h1>
            <button onClick={handleClick}></button>
        </div>
    );
}
