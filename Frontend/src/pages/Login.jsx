import React from "react";
import { Form, Link, useNavigate } from "react-router-dom";


export function Login(){
    return (
        <div className="login">
            <div className="login-intro">
                <h2>Logo Here</h2>
                <h4>Welcome Back!!</h4>
                <h1>Log In</h1>
            </div>
            <Form className="login-form">
                <div className="form-input">
                    <label for="login-email">Email</label>
                    <input type="email" name="email" placeholder="Email" id="login-email"/>
                </div>
                <div className="form-input">
                    <label for="login-password">Password</label>
                    <input type="password" name="password" placeholder="Password" id="login-password"/>
                </div>
                <button className="login-signup-btn">Log In</button>
            </Form>
            <p>Don't have an account yet? <Link to="/FurryBook/signup">Sign Up for free</Link></p>
        </div>
    )
}