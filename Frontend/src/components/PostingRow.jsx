import React, { useRef } from "react";
import { styled } from "styled-components";
import {
    HiOutlinePhotograph,
    HiOutlineVideoCamera,
    HiOutlineEmojiHappy,
} from "react-icons/hi";
import axios from "axios";
import { Const } from "../Const";

const PostingContainer = styled.div`
    border-radius: 30px;
    padding: 20px 40px 20px 40px;
    width: 91%;
    margin: 20px 40px 0 40px;
    border: none;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
`;

const CaptionContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 1% 0 0;
`;

const StyledProfilePicture = styled.div`
    height: 60px;
    width: 60px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
    margin-right: 20px;
`;

const Input = styled.input`
    border-radius: 20px;
    border: none;
    background-color: #eeeeee;
    width: 90%;
    height: 50px;
    padding: 0 20px;
`;

const PostButton = styled.button`
    align-self: flex-end;
    background-color: #153fac;
    color: white;
    padding: 10px 40px;
    border: none;
    border-radius: 15px;
`;

const SelectionButton = styled.button`
    border: none;
    background-color: transparent;
    margin-right: 30px;
`;

const ButtonContent = styled.div`
    display: flex;
    align-items: center;
    color: gray;
    font-size: 18px;
`;

const StyledPost = styled.div`
    height: 300px;
    width: 300px;
    background-size: cover;
    background-position: center;
    border-radius: 15px;
    margin-left: 80px;
    margin-top: 10px;
`;

export function PostingRow({ userId, profilePic, name, togglePopup, file }) {
    const inputRef = useRef(null);
    const url = `http://${Const}:3001/api/posts/${userId}`;

    const handleUpload = async () => {
        const formData = new FormData();
        if (file) formData.append("post", file);
        else {
            const placeholderFile = new File([""], "placeholder.txt", {
                type: "text/plain",
            });
            formData.append("post", placeholderFile);
        }
        formData.append("caption", inputRef.current.value);
        try {
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            window.location.reload();
        } catch (error) {
            console.log("Some error occurred.");
        }
    };

    return (
        <PostingContainer>
            <CaptionContainer>
                <StyledProfilePicture
                    style={{
                        backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                    }}
                />
                <Input
                    placeholder={`What's happening, ${name}?`}
                    ref={inputRef}
                />
            </CaptionContainer>
            {file ? (
                file.type.split("/")[0] === "image" ? (
                    <StyledPost
                        style={{
                            backgroundImage: `url("${URL.createObjectURL(
                                file
                            )}")`,
                        }}
                    ></StyledPost>
                ) : (
                    <video
                        src={URL.createObjectURL(file)}
                        loop
                        controls
                        style={{
                            height: "400px",
                            width: "400px",
                            borderRadius: "15px",
                            marginLeft: "80px",
                            marginTop: "10px",
                        }}
                    ></video>
                )
            ) : null}
            <ButtonsContainer>
                <div style={{ display: "flex" }}>
                    <SelectionButton>
                        <ButtonContent>
                            <HiOutlineVideoCamera
                                style={{ marginRight: "10px" }}
                            />
                            <p style={{ margin: "0" }}>Live Video</p>
                        </ButtonContent>
                    </SelectionButton>
                    <SelectionButton onClick={togglePopup}>
                        <ButtonContent>
                            <HiOutlinePhotograph
                                style={{ marginRight: "10px" }}
                            />
                            <p style={{ margin: "0" }}>Photo/Video</p>{" "}
                        </ButtonContent>
                    </SelectionButton>
                    <SelectionButton>
                        <ButtonContent>
                            <HiOutlineEmojiHappy
                                style={{ marginRight: "10px" }}
                            />
                            <p style={{ margin: "0" }}>Feeling</p>{" "}
                        </ButtonContent>
                    </SelectionButton>
                </div>
                <PostButton onClick={handleUpload}>Post</PostButton>
            </ButtonsContainer>
        </PostingContainer>
    );
}
