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
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
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

const StyledImage = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 10px 10px 0 0;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const StyledUserInfo = styled.div`
    display: flex;
    justify-content: center;
    width: 200px;
    height: 50px;
    background-color: white;
    border-radius: 0 0 10px 10px;
    font-family: "Inter", sans-serif;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

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
`;

const cardsStyle = {
    display: "grid",
    gridTemplateColumns: "200px 200px",
    gridGap: "50px",
};

const CardContainer = styled.div`
    position: relative;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background: none;
    border: none;
    font-size: 16px;
    font-weight: bold;
    color: #999;
    cursor: pointer;
`;

export async function action({ request }) {
    const formData = await request.formData();
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");

    try {
        const response = await axios.post("http://localhost:3001/users/login", {
            email: enteredEmail,
            password: enteredPassword,
        });
        const pastUserIds =
            JSON.parse(localStorage.getItem("pastUserIds")) || [];
        const newId = response.data;
        if (!pastUserIds.includes(newId)) {
            pastUserIds.push(newId);
            const updatedPastUserIds = JSON.stringify(pastUserIds);
            localStorage.setItem("pastUserIds", updatedPastUserIds);
        }
        localStorage.setItem("userId", response.data);
        localStorage.setItem("loggedIn", true);
        return redirect("/FurryBook");
    } catch (error) {
        return error.response.data;
    }
}

export function Login() {
    const actionData = useActionData();
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
                    {actionData && (
                        <StyledErrorMessage>{actionData}</StyledErrorMessage>
                    )}
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

    const PastLoginCards = () => {
        const [cards, setCards] = React.useState([]);

        React.useEffect(() => {
            const fetchProfilePicturePaths = async () => {
                try {
                    const pastLogin = JSON.parse(
                        localStorage.getItem("pastUserIds")
                    );
                    const cardData = await Promise.all(
                        pastLogin.map(async (userId) => {
                            const response = await axios.get(
                                `http://localhost:3001/users/${userId}/profile-picture`
                            );
                            const userResponse = await axios.get(
                                `http://localhost:3001/users/${userId}`
                            );
                            return {
                                userId,
                                profilePicturePath: response.data
                                    ?.split("/")
                                    ?.pop(),
                                name: userResponse.data.name,
                            };
                        })
                    );
                    setCards(cardData);
                } catch (error) {
                    console.error(
                        "Error fetching profile picture paths:",
                        error
                    );
                }
            };

            fetchProfilePicturePaths();
        }, []);

        const handleRemoveCard = (userId) => {
            const updatedCards = cards.filter((card) => card.userId !== userId);
            setCards(updatedCards);

            const pastUserIds = JSON.parse(localStorage.getItem("pastUserIds"));
            const updatedUserIds = pastUserIds.filter((id) => id !== userId);
            localStorage.setItem("pastUserIds", JSON.stringify(updatedUserIds));
        };

        return (
            <div style={cardsStyle}>
                {cards.map((card) => (
                    <CardContainer key={card.userId}>
                        <CloseButton
                            onClick={() => handleRemoveCard(card.userId)}
                        >
                            x
                        </CloseButton>
                        <StyledImage
                            style={{
                                backgroundImage: `url("/assets/profile pictures/${card.profilePicturePath}")`,
                            }}
                        />
                        <StyledUserInfo>{card.name}</StyledUserInfo>
                    </CardContainer>
                ))}
            </div>
        );
    };

    return (
        <StyledDiv>
            <StyledRecentLoginDiv>
                <StyledLogo>FurryBook</StyledLogo>
                <StyledMessage>Recent Logins</StyledMessage>
                <StyledDescription>
                    These are all the past logins
                </StyledDescription>
                {JSON.parse(localStorage?.getItem("pastUserIds")) ? (
                    JSON.parse(localStorage?.getItem("pastUserIds"))?.length !=
                    0 ? (
                        <PastLoginCards />
                    ) : (
                        <StyledLogo style={{ fontSize: "20px" }}>
                            No recent logins yet, 🌟 Sign in now to uncover
                            exclusive content
                        </StyledLogo>
                    )
                ) : (
                    <StyledLogo style={{ fontSize: "20px" }}>
                        No recent logins yet, 🌟 Sign in now to uncover
                        exclusive content
                    </StyledLogo>
                )}
            </StyledRecentLoginDiv>
            <LoginForm />
        </StyledDiv>
    );
}
