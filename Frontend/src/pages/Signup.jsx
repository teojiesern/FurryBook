import { useState, Link } from 'react';
import styled from 'styled-components';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUser } from '../api/CreateUser';

const StyledLogo = styled.div`
    position: absolute;
    top: 12%;
    color: #153FAC;
    font-family: 'Inter', sans-serif;
    font-size: 3.7rem;
`

const StyledWelcome = styled.div`
    position: absolute;
    top: 8%;
    color: #B1C6FB;
    font-family: 'Inter', sans-serif;
    font-size: 2.5rem;
`

const StyledBanner = styled.div`
    position: absolute;
    top: 2%;
    left: 12%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50em;
    width: 40rem;
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
  position: absolute;
  top: 6%;
  left: 56%;
  font-family: 'Montserrat', sans-serif;
  background-color: #FFFFFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 43em;
  width: 33%;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

const Text = styled.span`
  font-size: 14px;
  color: #7374A7;
`;

const Warning = styled.p`
    font-size: 14px;
    color: red;
`

const WhiteBox = styled.div`
  position: absolute;
  top: 26%;
  background-color: #FFF;
  width: 42em;
  height: 31em;
  border-radius: 20px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const Overlay = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background-image: url('/assets/banner.jpg');
  background-size: cover;
  background-position: center;
  opacity: 0.7; /* Adjust the opacity as needed */
  border-radius: 20px;
`

export function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      phoneNumber: '',
    });
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
    
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

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
        createUser(handleSuccess, handleError, formData.name, formData.email, formData.phoneNumber, password)
      } else {
        setPasswordMatch(false);
      }
    }

    const handleSuccess = () => {
      navigate('/FurryBook/login');
    }

    const handleError = (errorResponse) => {
        setError(errorResponse.error);
    }

    return (
        <div>
            <StyledBanner>
                <StyledWelcome>Welcome To</StyledWelcome>
                <StyledLogo>FurryBook</StyledLogo>
                <WhiteBox>
                  <Overlay/>
                </WhiteBox>
            </StyledBanner>
            <SignUpContainer>
                <StyledText>Get Started.</StyledText>
                <SignUpForm onSubmit={handleSubmit}>
                    <SignUpInput type="text" label="Name" placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                    <SignUpInput type="email" label="Email" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                    <SignUpInput type="text" label="Phone Number" placeholder="Phone Number" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                    <SignUpInput type="password" label="Password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <SignUpInput type="password" label="Confirm Password" placeholder="Password" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                    {error && <Warning>There is an existing user with the same email.</Warning>}
                    {!passwordMatch && <Warning>Passwords do not match.</Warning>}
                    <SignUpButton type="submit">Sign Up</SignUpButton>
                    <Text>Already have an account? <NavLink as={Link} to="/FurryBook/login">Sign In</NavLink></Text>
                </SignUpForm>
            </SignUpContainer>
        </div>
    )
}