import { useState, Link } from 'react';
import styled from 'styled-components';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const StyledLogo = styled.div`
    color: #153FAC;
    font-family: 'Inter', sans-serif;
    width: 15%;
    margin: 30px 30px 100px 30px;
    font-size: 30px;
`

const StyledText = styled.div`
    display: flex;
    color: #153FAC;
    font-family: 'Inter', sans-serif;
    width: 50%;
    margin: 0 30px 30px 30px;
    font-size: 40px;
    align-items: center;
    justify-content: center;
`

const SignUpContainer = styled.div`
  margin-left: 60%;
  margin-top: -5%;
  font-family: 'Montserrat', sans-serif;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 43em;
  width: 33%;
  border-radius: 20px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpInputContainer = styled.div`
  position: relative;
  margin: 15px 0 25px 0;
`;

const Input = styled.input`
  padding: 10px 10px 0 10px; 
  width: 27rem;
  border: none;
  border-bottom: 2px solid #7374A7;
  outline: none;
  color: #0B2F8A;
  font-weight: 500;

  &::placeholder {
    font-weight: 400;
    color: #999;
  }
`;

const SignUpInputLabel = styled.label`
  position: absolute;
  top: -10px;
  left: 10px;
  font-size: 12px;
  color: #7374A7;
`;

const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const SignUpInput = ({ label, type, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [inputType, setInputType] = useState(type);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setInputType(showPassword ? type : 'text');
    };
    return (
        <SignUpInputContainer>
            <Input type={inputType} {...rest} />
            <SignUpInputLabel>{label}</SignUpInputLabel>
            {type === 'password' && (
                <EyeIcon onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
                </EyeIcon>
            )}
        </SignUpInputContainer>
    );
};


const SignUpButton = styled.button`
  margin: 15px 0;
  padding: 10px 20px;
  background-color:#153FAC;
  border-radius: 10px;
  width: 13rem;
  color: #fff;
  border: none;
  cursor: pointer;
  box-shadow: 0px 8px 24px -2px rgba(11, 47, 138, 0.6);
`;

const LineBreak = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 30rem;
`;

const Line = styled.hr`
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 10px;
  color: #7374A7;
  border-width: 2px;
`;

const Text = styled.span`
  font-size: 14px;
  color: #7374A7;
`;

const Warning = styled.p`
    font-size: 14px;
    color: red;
`

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;

const RoundButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #FFF;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  cursor: pointer;
  border-width: 0;
  font-size: 35px;
  margin: 0 25px 25px 25px;
  box-shadow: 0px 8px 24px -2px rgba(69, 71, 76, 0.6);
`;

export function Signup(){
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (password === confirmPassword) {
        setPasswordMatch(true);
        // Passwords match, proceed with form submission
        // ...
      } else {
        // Passwords don't match, handle the error
        setPasswordMatch(false);
      }
    }

    return (
        <div>
            <StyledLogo>FurryBook</StyledLogo>
            <SignUpContainer>
                <StyledText>Get Started.</StyledText>
                <SignUpForm onSubmit={handleSubmit}>
                    <SignUpInput type="text" label="Name" placeholder="Name" />
                    <SignUpInput type="email" label="Email" placeholder="Email" />
                    <SignUpInput type="password" label="Password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <SignUpInput type="password" label="Confirm Password" placeholder="Password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                    {!passwordMatch && <Warning>Passwords do not match.</Warning>}
                    <SignUpButton type="submit">Sign Up</SignUpButton>
                    <LineBreak>
                        <Line />
                        <Text>Or sign up with</Text>
                        <Line />
                    </LineBreak>
                    <ButtonContainer>
                        <RoundButton><FaGoogle/></RoundButton>
                        <RoundButton><FaFacebook/></RoundButton>
                        <RoundButton><FaTwitter/></RoundButton>
                    </ButtonContainer>
                    <Text>Already have an account? <NavLink as={Link} to="/FurryBook/login">Sign In</NavLink></Text>
                </SignUpForm>
            </SignUpContainer>
        </div>
    )
}