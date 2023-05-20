import React from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const StyledDiv = styled.div`
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #fafafa;
`;

const StyledRecentLoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    height: 90%;
    width: 58%;
    padding: 5rem 12rem;
`;

const StyledLoginFormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 42%;
    background-color: #ffffff;
    padding: 2rem 2rem 2rem 2rem;
    border-radius: 10px;
    margin-right: 10rem;
    font-family: "Inter", sans-serif;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledH1 = styled.h1`
    color: #153fac;
    font-family: "Inter", sans-serif;
`;

const StyledLogo = styled(StyledH1)`
    font-size: 3rem;
`;

const StyledMessage = styled.h2`
    color: black;
    font-family: "Inter", sans-serif;
`;

const StyledDescription = styled.p`
    color: gray;
    font-family: "Inter", sans-serif;
`;

const StyledCardDiv = styled.div`
    width: 200px;
    height: 300px;
`;

const StyledImage = styled.div`
    width: 100%;
    height: 65%;
    border-radius: 10px 10px 0 0;
    background-image: url("/assets/firstplacemen.JPG");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledUserInfo = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: 15%;
    background-color: white;
    border-radius: 0 0 10px 10px;
    font-family: "Inter", sans-serif;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ExampleComponent = () => {
    return (
        <StyledCardDiv>
            <StyledImage />
            <StyledUserInfo>Teo Jie Sern</StyledUserInfo>
        </StyledCardDiv>
    );
};

const StyledWelcome = styled(StyledH1)`
    font-size: 2rem;
    margin: 4rem 0;
`;

const StyledInput = styled.input`
    border: none;
    border-bottom: 1px solid black;
    margin-bottom: 2rem;
    color: #0b2f8a;
    padding: 0.5rem 0.5rem;

    &::placeholder {
        color: #0b2f8a;
    }
`;

const StyledButton = styled.button`
    color: white;
    background-color: #153fac;
    border: none;
    border-radius: 10px;
    width: 50%;
    align-self: center;
    padding: 0.6rem;
`;

const StyledLabel = styled.label`
    color: gray;
    padding-left: 0.5rem;
`;

const linkStyle = {
    textDecoration: "none",
    color: "#153FAC",
};

const formStyle = {
    display: "flex",
    flexDirection: "column",
    width: "80%",
};

const StyledErrorMessage = styled.h3`
    color: red;
    font-size: 1rem;
    align-self: center;
`

export async function action({ request }) {
    const formData = await request.formData();
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");

    try {
        const response = await axios.post("http://localhost:3001/users/login", {
            email: enteredEmail,
            password: enteredPassword,
        });
        localStorage.setItem("userId", response.data);
        localStorage.setItem("loggedIn", true);
        return redirect("/FurryBook");
    } catch (error) {
        return error.response.data;
    }
}

export function Login() {
    const actionData = useActionData()

    const LoginForm = () => {
        return (
            <StyledLoginFormDiv>
                <StyledWelcome>Welcome Back</StyledWelcome>
                
                <Form style={formStyle} method="post" replace>
                    <StyledLabel for="login-email">Email</StyledLabel>
                    <StyledInput
                        type="email"
                        name="email"
                        id="login-email"
                        placeholder="Enter your Email"
                    ></StyledInput>
                    <StyledLabel for="login-password">Password</StyledLabel>
                    <StyledInput
                        type="password"
                        name="password"
                        id="login-password"
                        placeholder="Enter your Password"
                    ></StyledInput>
                    {actionData && <StyledErrorMessage>{actionData}</StyledErrorMessage>}
                    <StyledButton>Login</StyledButton>
                </Form>
                <StyledDescription style={{ marginTop: "1.2rem" }}>
                    Don't have an account yet?{" "}
                    <Link style={linkStyle} to="/FurryBook/signup">
                        Sign Up
                    </Link>
                </StyledDescription>
            </StyledLoginFormDiv>
        );
    };

    return (
        <StyledDiv>
            <StyledRecentLoginDiv>
                <StyledLogo>FurryBook</StyledLogo>
                <StyledMessage>Recent Logins</StyledMessage>
                <StyledDescription>
                    Click your picture or add an account
                </StyledDescription>
                <ExampleComponent />
            </StyledRecentLoginDiv>
            <LoginForm />
        </StyledDiv>
    );
}
