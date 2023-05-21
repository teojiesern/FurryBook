import React from "react";
import { useParams } from "react-router-dom";

export function Friends() {
    const params = useParams();
    return (
        <div>
            <h1>this is the friends page</h1>
        </div>
    );
}
