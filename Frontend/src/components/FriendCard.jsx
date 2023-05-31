import { Link } from "react-router-dom";
import { styled } from "styled-components";

const CardBody = styled.div`
    font-family: "Montserrat", sans-serif;
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-top: 15px;
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const ProfilePicture = styled.div`
    height: 70px;
    width: 70px;
    background-size: cover;
    background-position: center;
    border-radius: 20%;
    margin-right: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const MutualFriends = styled.div`
    font-size: 16px;
    color: #808080;
`;

const Name = styled.div`
    font-size: 20px;
    color: #000000;
`;

const FriendCard = ({ profilePicture, name, mutualFriends, userId }) => {
    const profilePic = profilePicture?.split("/").pop();
    return (
        <CardBody as={Link} to={`/FurryBook/profile/${userId}`}>
            <ProfilePicture
                style={{
                    backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                }}
            ></ProfilePicture>
            <div>
                <Name>{name}</Name>
                {mutualFriends > 0 ? (
                    <MutualFriends>
                        {mutualFriends} mutual friends
                    </MutualFriends>
                ) : (
                    <MutualFriends>No mutual friends</MutualFriends>
                )}
            </div>
        </CardBody>
    );
};

export default FriendCard;
