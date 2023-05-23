import React from "react";
import { styled } from "styled-components";

const StyledPopupBox = styled.div`
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
`;

const StyledBox = styled.div`
    position: relative;
    width: 50%;
    margin: 0 auto;
    height: auto;
    max-height: 70vh;
    margin-top: calc(100vh - 85vh - 20px);
    background: #fff;
    background-color: #fafafa;
    border-radius: 20px;
    padding: 30px;
    border: 1px solid #999;
    overflow: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const StyledClose = styled.span`
    content: "x";
    cursor: pointer;
    position: fixed;
    right: calc(25% - 30px);
    top: calc(100vh - 85vh - 33px);
    background: #ededed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
`;

const StyledCommentsTop = styled.div`
    text-align: center;
    border-bottom: 1px solid black;
    font-size: 30px;
    padding: 10px;
`;

export function Popup(props) {
    return (
        <StyledPopupBox>
            <StyledBox>
                <StyledClose onClick={props.handleClose}>&times;</StyledClose>
                <StyledCommentsTop>{props.top}</StyledCommentsTop>
                {props.content}
            </StyledBox>
        </StyledPopupBox>
    );
}
