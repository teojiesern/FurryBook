import React from "react";
import { AllPosts } from "../../api/AllPosts";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";

const PhotosContainer = styled.div`
    margin: 20px 40px 40px 40px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    padding: 20px;
    gap: 10px;
`;

const PhotoCard = styled.div`
    border-radius: 15px;
    background-size: cover;
    background-position: center;
    width: 22vw;
    height: 30vh;
`;

export function ProfilePhotos() {
    const [allPhotos, setAllPhotos] = React.useState();
    const userId = useParams().userId;

    console.log(allPhotos);
    React.useEffect(() => {
        const getAllPost = async () => {
            const temp = await AllPosts(userId);
            const photos = temp.filter((t) => t.type === "image");
            setAllPhotos(photos);
        };
        getAllPost();
    }, [userId]);

    const userPhotos = allPhotos?.map((photo) => (
        <PhotoCard
            style={{
                backgroundImage: `url("/assets/post storage/${photo.name}")`,
            }}
        ></PhotoCard>
    ));

    return <PhotosContainer>{userPhotos}</PhotosContainer>;
}
