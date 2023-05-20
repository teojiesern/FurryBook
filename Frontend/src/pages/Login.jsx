import React from "react";
import styled from "styled-components";

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
  width: 60%;
  padding: 20rem 15rem;
`;

const StyledLoginFormDiv = styled.div`
  width: 40%;
  background-color: #ffffff;
  padding: 2rem 2rem 2rem 2rem;
  border-radius: 10px;
  margin-right: 2rem;
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

const StyledClickBox = styled.div`
  width: 200px;
  height: 200px;
  border: none;
  border-radius: 10px;
`;

const StyledImg = styled.img`
width: 10rem;
height: auto;


`

const StyledWelcome = styled(StyledH1)`
  font-size: 2rem;
`;

export function Login() {
  return (
    <StyledDiv>
      <StyledRecentLoginDiv>
        <StyledLogo>FurryBook</StyledLogo>
        <StyledMessage>Recent Logins</StyledMessage>
        <StyledDescription>Click your picture or add an account</StyledDescription>
        <StyledClickBox>
            {/* <StyledImg src="/assets/profile.png"/> */}
        </StyledClickBox>
      </StyledRecentLoginDiv>
      <StyledLoginFormDiv>
        <StyledWelcome>Welcome Back</StyledWelcome>
      </StyledLoginFormDiv>
    </StyledDiv>
  );
}
