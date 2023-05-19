import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { AiFillHome } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';
import { RiProfileFill, RiSettings3Fill } from 'react-icons/ri';

const StyledLogo = styled.div`
    color: #153FAC;
    font-family: 'Inter', sans-serif;
    width: 15%;
    margin: 30px 30px 100px 30px;
    font-size: 30px;
`

const StyledNav = styled(Nav)`
    color: #153FAC;
    height: 100%;
    font-size: 20px;
`;

const StyledNavLink = styled(Nav.Link)`
  display: flex;
  align-items: center;
  color: #B1C6FB;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  text-decoration: none;
  margin: 15px 30px;
  width: 10%;

  &:hover {
    color: #B1C6FB;
  }
`;

const activeStyle = {
    color: '#153FAC',
    fontWeight: 400,
}

const CustomNavLink = ({ to, children }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <StyledNavLink as={Link} to={to} style={isActive ? activeStyle : {}}>
          {children}
        </StyledNavLink>
      );
}

CustomNavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.string.isRequired,
};

const Icon = styled.div`
    display: flex;
    align-items: center;
    font-size: 30px;
    margin-right: 10px;

`



export function Navbar() {
  return (
    <StyledNav defaultActiveKey="/FurryBook" className="flex-column">
      <StyledLogo>FurryBook</StyledLogo>
      <CustomNavLink as={Link} to="/FurryBook">
        <Icon><AiFillHome/></Icon>Home
      </CustomNavLink>
      <CustomNavLink as={Link} to="/FurryBook/someone">
        <Icon><RiProfileFill/></Icon>Profile
      </CustomNavLink>
      <CustomNavLink as={Link} to="/FurryBook/someone/friends">
        <Icon><FaUserFriends/></Icon>Friends
      </CustomNavLink>
      <CustomNavLink as={Link} to="/FurryBook/someone/settings">
        <Icon><RiSettings3Fill/></Icon>Settings
      </CustomNavLink>
      {/* <CustomNavLink as={Link} to="/FurryBook/login">
        Login
      </CustomNavLink>
      <CustomNavLink as={Link} to="/FurryBook/signup">
        Signup
      </CustomNavLink> */}
    </StyledNav>
  );
}
