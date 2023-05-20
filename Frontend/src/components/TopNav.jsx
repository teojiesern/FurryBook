import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { BiSearch } from "react-icons/bi";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const StyledDiv = styled.div`
    display: flex;
    justify-content: center;
    width: 80vw;
    margin-top: 30px;
    margin-bottom: 40px;
`;
const StyledSearchBar = styled.input`
    border: none;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2), -10px 0 #153fac;
    height: 50px;
    width: 300px;

    &::placeholder {
        text-align: center;
    }
`;

const StyledDropDown = styled(DropdownButton)`
    width: 200px;
    color: black;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    border: none;
`;

const StyledOption = styled.option`
    padding: 2rem;
    background-color: #f2f2f2;
    color: #333;
    font-weight: bold;
    border-bottom: 1px solid #ccc;
    cursor: pointer;
`;

const StyledDropdownItem = styled(Dropdown.Item)`
  background-color: #f2f2f2;
  color: #333;

  &:hover {
    background-color: #ccc;
    color: #fff;
  }
`;

const searchIconStyle = {
    position: "absolute",
    top: "47px",
    right: "44vw",
};

export function TopNav() {
    return (
        <div>
            <StyledDiv>
                <div style={{ margin: "auto" }}>
                    <StyledSearchBar type="search" placeholder="Search..." />
                    <div>
                        <BiSearch style={searchIconStyle} />
                    </div>
                </div>
                <StyledDropDown
                    title="Dropdown button"
                >
                    <StyledDropdownItem href="#/action-1">Action</StyledDropdownItem>
                    <StyledDropdownItem href="#/action-2">
                        Another action
                    </StyledDropdownItem>
                    <StyledDropdownItem href="#/action-3">
                        Something else
                    </StyledDropdownItem>
                </StyledDropDown>
            </StyledDiv>
            <Outlet />
        </div>
    );
}
