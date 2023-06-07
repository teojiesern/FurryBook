import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

const supportedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/webm",
];

export function Postings({ togglePopup, getDataFromChild }) {
    const handleFileChange = (newFiles) => {
        if (newFiles.length > 0) {
            const file = newFiles[0];
            if (supportedTypes.includes(file.type)) {
                togglePopup();
                getDataFromChild(file);
            } else {
                console.log("Invalid file type.");
            }
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
        </div>
    );
}
