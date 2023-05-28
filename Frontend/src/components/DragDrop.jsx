import React, { useState } from "react";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";

const supportedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/webm",
];

function DragDrop({ userId, update }) {
    const [file, setFile] = useState(null);
    const [fileType, setFileType] = useState(null);

    const handleFileChange = async (file) => {
        if (supportedTypes.includes(file.type)) {
            setFile(file);
            setFileType(file.type);
        } else {
            console.log("Invalid file type.");
        }
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append("post", file);

            const response = await axios.post(
                `http://localhost:3001/users/${userId}/${update}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log("Image uploaded:", response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <FileUploader handleChange={handleFileChange} name="file" />
            {file && (
                <div>
                    <h3>Selected File:</h3>
                    <p>Name: {file.name}</p>
                    <p>Type: {fileType}</p>
                    <p>Size: {file.size} bytes</p>
                </div>
            )}
            {file && fileType.startsWith("image/") ? (
                <div>
                    <h3>Uploaded Image:</h3>
                    <img src={URL.createObjectURL(file)} alt="Uploaded" />
                </div>
            ) : (
                <div>
                    <h3>Uploaded Video:</h3>
                    {/* <video src={URL.createObjectURL(file)} controls /> */}
                </div>
            )}
            {file && (
                <button onClick={handleUpload} disabled={!file}>
                    Upload Image
                </button>
            )}
        </div>
    );
}

export default DragDrop;
