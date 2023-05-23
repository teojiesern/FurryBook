import { useState, Link } from 'react';
import styled from 'styled-components';
import { RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
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
    top: 10%;
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
  top: 12%;
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

// const LineBreak = styled.div`
//   display: flex;
//   align-items: center;
//   text-align: center;
//   margin-top: 20px;
//   margin-bottom: 20px;
//   width: 30rem;
// `;

// const Line = styled.hr`
//   flex-grow: 1;
//   margin-left: 10px;
//   margin-right: 10px;
//   color: #7374A7;
//   border-width: 2px;
// `;

const Text = styled.span`
  font-size: 14px;
  color: #7374A7;
`;

const Warning = styled.p`
    font-size: 14px;
    color: red;
`

// const ButtonContainer = styled.div`
//   display: flex;
//   align-items: center;
// `;

// const RoundButton = styled.button`
//   width: 40px;
//   height: 40px;
//   border-radius: 50%;
//   background-color: #FFF;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 0;
//   cursor: pointer;
//   border-width: 0;
//   font-size: 35px;
//   margin: 0 25px 25px 25px;
//   box-shadow: 0px 8px 24px -2px rgba(69, 71, 76, 0.6);
// `;

const WhiteBox = styled.div`
  position: absolute;
  top: 26%;
  background-color: #FFF;
  width: 42em;
  height: 31em;
  border-radius: 20px;
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

export function Signup(){
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
        createUser(formData.name, formData.email, formData.phoneNumber, password)
      } else {
        setPasswordMatch(false);
      }
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
                    {!passwordMatch && <Warning>Passwords do not match.</Warning>}
                    <SignUpButton type="submit">Sign Up</SignUpButton>
                    <Text>Already have an account? <NavLink as={Link} to="/FurryBook/login">Sign In</NavLink></Text>
                </SignUpForm>
            </SignUpContainer>
        </div>
    )
}