import React, { useState } from "react";
import axios from "axios";
import { DropzoneArea } from "material-ui-dropzone";
import { styled } from "styled-components";
import { Const } from "../Const";

const supportedTypes = ["image/jpeg", "image/png", "image/gif"];

const StyledProfilePicture = styled.div`
    width: 220px;
    height: 220px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
`;

const StyledBackgroundCoverPhoto = styled.div`
    background-size: cover;
    background-position: center;
    border-radius: 30px;
    border: none;
    width: 400px;
    height: 250px;
`;

function DragDrop({ changeType, userId }) {
    const [file, setFile] = useState(null);
    const url =
        changeType === "profile"
            ? `http://${Const}:3001/users/${userId}/update-profile-picture`
            : `http://${Const}:3001/users/${userId}/update-cover-photo`;
    const handleFileChange = (newFiles) => {
        if (newFiles.length > 0) {
            const file = newFiles[0];
            if (supportedTypes.includes(file.type)) {
                setFile(file);
            } else {
                console.log("Invalid file type.");
            }
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const response = await axios.post(url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            window.location.reload();
        } catch (error) {
            console.log("some error occured");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <DropzoneArea
                onChange={handleFileChange}
                filesLimit={1}
                maxFileSize={100000000000}
                showPreviewsInDropzone={false}
                acceptedFiles={supportedTypes}
            />
            {file && (
                <div>
                    <h2 style={{ textAlign: "center" }}>Preview</h2>
                    <div>
                        {changeType === "profile" ? (
                            <StyledProfilePicture
                                style={{
                                    backgroundImage: `url("${URL.createObjectURL(
                                        file
                                    )}")`,
                                }}
                            />
                        ) : (
                            <StyledBackgroundCoverPhoto
                                style={{
                                    backgroundImage: `url("${URL.createObjectURL(
                                        file
                                    )}")`,
                                }}
                            />
                        )}
                    </div>
                </div>
            )}
            {file && (
                <button
                    onClick={handleUpload}
                    disabled={!file}
                    style={{
                        border: "none",
                        padding: "10px 60px",
                        marginTop: "10px",
                        borderRadius: "10px",
                        backgroundColor: "#153fac",
                        color: "white",
                    }}
                >
                    Upload Image
                </button>
            )}
        </div>
    );
}

export default DragDrop;
