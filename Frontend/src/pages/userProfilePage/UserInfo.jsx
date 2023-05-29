import React, { useRef } from "react";
import { css, styled } from "styled-components";
import { HiGlobeAsiaAustralia } from "react-icons/hi2";
import { FaBirthdayCake, FaUserFriends } from "react-icons/fa";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { GiLovers } from "react-icons/gi";
import { IoPersonOutline } from "react-icons/io5";
import { TfiLocationPin } from "react-icons/tfi";
import { Popup } from "../../Utils/Popup";
import { UserData } from "../../api/UserData";

const StyledPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    margin: 20px 40px 50px 40px;
    border-radius: 30px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    padding: 20px 40px 20px 40px;
`;

const StyledName = styled.h1`
    margin: 0;
    font-size: 30px;
`;

const StyledInfosContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 20px;
`;

const StyledInfo = styled.h4`
    color: black;
    font-size: 15px;
    margin: 0;
`;

const StyledEditButton = styled.button`
    background-color: #gray;
    padding: 10px;
    text-align: center;
    color: black;
    width: 100%;
    border: none;
    border-radius: 10px;
`;

const StyledProfilePicture = styled.div`
    height: 200px;
    width: 200px;
    background-size: cover;
    background-position: center;
    border-radius: 200px;
    margin-right: 20px;
    margin-bottom: 10%;
`;

const StyledCoverPhoto = styled.div`
    height: 30vh;
    width: 90%;
    background-size: cover;
    background-position: center;
    border-radius: 20px;
    margin: 10px 20px 10% 0;
`;

const StyledEditDetailContainer = styled.div`
    display: flex;
    margin: 10px;
`;

const StyledProfAndCover = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 3;
`;

const StyledDividerContainer = styled.div`
    display: flex;
    justify-content: center;
    flex: 0.5;
`;

const StyledDividerLine = styled.div`
    height: 100%;
    width: 1.3px;
    background-color: gray;
`;

const StyledEditProfileAndCover = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px;
`;

const StyledChangeText = styled.h4`
    font-size: 20px;
    font-family: Montserrat, sans-serif;
    color: #153fac;
    margin: 0;
    cursor: pointer;
`;

const StyledDescription = styled.h1`
    font-size: 20px;
    margin: 0;
`;

const StyledInput = styled.input`
    width: 60%;
    padding: 10px;
    border: none;
    border-bottom: 1px solid grey;
    outline: none;

    ${(props) =>
        props.disabled &&
        css`
            background-color: white;
        `}
`;

const StyledOverallContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    border-radius: 20px;
    margin-top: 20px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

const StyledSubmitForm = styled.button`
    background-color: #153fac;
    color: white;
    font-family: Montserrat, sans-serif;
    border: none;
    padding: 10px;
    width: 20%;
    align-self: flex-end;
    border-radius: 10px;
    margin-top: 20px;
`;

const StyledHobbiesContainer = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 30% 0 0;
`;

const StyledDeleteButton = styled.button`
    border: none;
    width: 10%;
    border-radius: 200px;
`;

const StyledUL = styled.ul`
    padding: 0;
    padding-left: 20px;
`;

const StyledAddSpan = styled.span`
    font-size: 15px;
    margin-left: 20px;
    color: #153fac;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
`;

const changeStyle = {
    margin: "20px 0 50px 40px",
    color: "gray",
};

const iconStyle = {
    marginRight: "5px",
};

const fakeIconStyle = {
    width: "7%",
    marginRight: "5px",
};

const formStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gridTemplateRows: "15% 15%",
    alignContent: "start",
    flex: "6",
};

const selectStyle = {
    background: "transparent",
    border: "none",
    outline: "none",
    maxWidth: "20px",
};

const marginTop = {
    marginTop: "10px",
};

export function UserInfo({ datas, friends, submit, userId }) {
    const [data, setData] = React.useState(datas);
    const [isOpen, setIsOpen] = React.useState(false);
    const [relationshipStatus, setRelationshipStatus] = React.useState(
        data.relationshipStatus
    );
    const [gender, setGender] = React.useState(data.gender);
    const [location, setLocation] = React.useState(data.location);
    const [hob, setHob] = React.useState(data.hobbies);
    const [hobUpdates, setHobUpdates] = React.useState([]);
    const [allJobs, setAllJobs] = React.useState(data.jobs);
    const [jobUpdate, setJobUpdate] = React.useState([]);
    const profilePic = data.profilePicturePath.split("/").pop();
    const coverPhoto = data.coverPhotoPath.split("/").pop();
    const hobbiesRef = useRef(null);
    const jobsRef = useRef(null);
    const currentLogin = localStorage.getItem("userId");

    React.useEffect(() => {
        const getDataBasedOnId = async () => {
            const temp = await UserData(userId);
            setData(temp);
        };
        getDataBasedOnId();
        console.log("data from effect", data);
    }, [userId, datas]);

    const hobbies =
        data.hobbies.length != 0
            ? data.hobbies.map((hobby, index) => (
                  <li key={index}>{<StyledInfo>{hobby}</StyledInfo>}</li>
              ))
            : null;

    const jobs =
        data.jobs.length != 0
            ? data.jobs.map((job, index) => (
                  <li key={index}>{<StyledInfo>{job}</StyledInfo>}</li>
              ))
            : null;

    const hobbiesForEdit =
        hob.length != 0
            ? hob.map((hobby, index) => {
                  return (
                      <StyledHobbiesContainer key={index}>
                          <StyledInfo style={{ marginLeft: "10px" }}>
                              {hobby}
                          </StyledInfo>
                          <StyledDeleteButton
                              onClick={(event) => {
                                  event.preventDefault();
                                  setHob((prevHob) =>
                                      prevHob.filter((h) => h !== hobby)
                                  );
                                  setHobUpdates((prevHobUpdate) => {
                                      prevHobUpdate?.push(hobby);
                                      return prevHobUpdate;
                                  });
                              }}
                          >
                              &times;
                          </StyledDeleteButton>
                      </StyledHobbiesContainer>
                  );
              })
            : null;

    const jobsForEdit =
        allJobs.length != 0
            ? allJobs.map((job, index) => {
                  return (
                      <StyledHobbiesContainer key={index}>
                          <StyledInfo style={{ marginLeft: "10px" }}>
                              {job}
                          </StyledInfo>
                          <StyledDeleteButton
                              onClick={(event) => {
                                  event.preventDefault();
                                  setAllJobs((prevAllJobs) =>
                                      prevAllJobs.filter((j) => j !== job)
                                  );
                                  setJobUpdate((prevJobUpdate) => {
                                      prevJobUpdate?.unshift(job);
                                      return prevJobUpdate;
                                  });
                              }}
                          >
                              &times;
                          </StyledDeleteButton>
                      </StyledHobbiesContainer>
                  );
              })
            : null;

    function addHobby() {
        const newHobby = hobbiesRef.current.value;
        hobbiesRef.current.value = "";
        setHob([...hob, newHobby]);
        setHobUpdates([...hobUpdates, newHobby]);
    }

    function addJobUpdate() {
        const newJobUpdate = jobsRef.current.value;
        jobsRef.current.value = "";
        setJobUpdate([...jobUpdate, newJobUpdate]);
        setAllJobs([newJobUpdate, ...allJobs]);
    }

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div style={{ width: "30%", fontFamily: "Montserrat, sans-serif" }}>
            <StyledPostContainer style={changeStyle}>
                <StyledName style={{ marginBottom: "25px" }}>Intro</StyledName>
                <StyledInfosContainer>
                    <MdOutlineDriveFileRenameOutline style={iconStyle} />
                    <StyledInfo>{data.name}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <img src="/assets/age.png" style={fakeIconStyle} />
                    <StyledInfo>{data.age}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <TfiLocationPin style={iconStyle} />
                    <StyledInfo>{data.location}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <HiGlobeAsiaAustralia style={iconStyle} />
                    <StyledInfo>{data.email}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <IoPersonOutline style={iconStyle} />
                    <StyledInfo>{data.gender}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <FaBirthdayCake style={iconStyle} />
                    <StyledInfo>{data.birthDate}</StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <GiLovers style={iconStyle} />
                    <StyledInfo>
                        {data.relationshipStatus == null
                            ? "prefer not to say"
                            : data.relationshipStatus}
                    </StyledInfo>
                </StyledInfosContainer>
                <StyledInfosContainer>
                    <FaUserFriends style={iconStyle} />
                    <StyledInfo>{friends}</StyledInfo>
                </StyledInfosContainer>
                <StyledName style={{ margin: "3vh 0 20px 0" }}>
                    Hobbies
                </StyledName>
                <StyledInfosContainer>
                    <StyledUL>{hobbies}</StyledUL>
                </StyledInfosContainer>
                <StyledName style={{ margin: "3vh 0 20px 0" }}>
                    Past Job Experiences
                </StyledName>
                <StyledInfosContainer>
                    <StyledUL>{jobs}</StyledUL>
                </StyledInfosContainer>
                {userId === currentLogin ? (
                    <StyledEditButton
                        onClick={() => {
                            togglePopup();
                        }}
                    >
                        Edit Details
                    </StyledEditButton>
                ) : null}
            </StyledPostContainer>

            {isOpen && (
                <Popup
                    handleClose={togglePopup}
                    topDisplay={"Edit Your Profile"}
                    width="85%"
                    height="95%"
                    right="calc(8% - 30px)"
                >
                    <StyledOverallContainer>
                        <StyledEditDetailContainer>
                            <StyledProfAndCover>
                                <StyledEditProfileAndCover>
                                    <StyledDescription>
                                        Profile Picture
                                    </StyledDescription>
                                    <StyledChangeText>Change</StyledChangeText>
                                </StyledEditProfileAndCover>
                                <StyledProfilePicture
                                    style={{
                                        backgroundImage: `url("/assets/profile pictures/${profilePic}")`,
                                    }}
                                ></StyledProfilePicture>
                                <StyledEditProfileAndCover>
                                    <StyledDescription>
                                        Cover Photo
                                    </StyledDescription>
                                    <StyledChangeText>Change</StyledChangeText>
                                </StyledEditProfileAndCover>
                                <StyledCoverPhoto
                                    style={{
                                        backgroundImage: `url("/assets/background photos/${coverPhoto}")`,
                                    }}
                                ></StyledCoverPhoto>
                            </StyledProfAndCover>
                            <StyledDividerContainer>
                                <StyledDividerLine></StyledDividerLine>
                            </StyledDividerContainer>
                            <form
                                style={formStyle}
                                onSubmit={async (e) => {
                                    await submit(
                                        e,
                                        hob,
                                        hobUpdates,
                                        jobUpdate,
                                        allJobs
                                    );
                                    setJobUpdate([]);
                                    setIsOpen(!isOpen);
                                }}
                                id="editDetailForm"
                            >
                                <div>
                                    <StyledDescription style={marginTop}>
                                        Full Name
                                    </StyledDescription>
                                    <StyledInput
                                        type="text"
                                        name="name"
                                        defaultValue={data.name}
                                    />
                                </div>
                                <div>
                                    <StyledDescription style={marginTop}>
                                        Birth Date
                                    </StyledDescription>
                                    <StyledInput
                                        type="date"
                                        name="birthDate"
                                        defaultValue={data.birthDate}
                                    />
                                </div>
                                <div>
                                    <StyledDescription style={marginTop}>
                                        Location
                                    </StyledDescription>
                                    <StyledInput
                                        type="text"
                                        name="location"
                                        value={location}
                                        disabled
                                    />
                                    <span>
                                        <select
                                            style={selectStyle}
                                            onChange={(e) => {
                                                setLocation(e.target.value);
                                            }}
                                            defaultValue={location}
                                        >
                                            <option value="Johor">Johor</option>
                                            <option value="Kedah">Kedah</option>
                                            <option value="Kelantan">
                                                Kelantan
                                            </option>
                                            <option value="Kuala Lumpur">
                                                Kuala Lumpur
                                            </option>
                                            <option value="Labuan">
                                                Labuan
                                            </option>
                                            <option value="Melaka">
                                                Melaka
                                            </option>
                                            <option value="Negeri Sembilan">
                                                Negeri Sembilan
                                            </option>
                                            <option value="Pahang">
                                                Pahang
                                            </option>
                                            <option value="Penang">
                                                Penang
                                            </option>
                                            <option value="Perak">Perak</option>
                                            <option value="Perlis">
                                                Perlis
                                            </option>
                                            <option value="Putrajaya">
                                                Putrajaya
                                            </option>
                                            <option value="Sabah">Sabah</option>
                                            <option value="Sarawak">
                                                Sarawak
                                            </option>
                                            <option value="Selangor">
                                                Selangor
                                            </option>
                                            <option value="Terengganu">
                                                Terengganu
                                            </option>
                                        </select>
                                    </span>
                                </div>
                                <div>
                                    <StyledDescription style={marginTop}>
                                        Gender
                                    </StyledDescription>
                                    <StyledInput
                                        type=""
                                        name="gender"
                                        value={gender}
                                        disabled
                                    />
                                    <span>
                                        <select
                                            style={selectStyle}
                                            defaultValue={gender}
                                            onChange={(e) => {
                                                setGender(e.target.value);
                                            }}
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Prefer not to say">
                                                Prefer not to say
                                            </option>
                                        </select>
                                    </span>
                                </div>
                                <div>
                                    <StyledDescription style={marginTop}>
                                        Phone Number
                                    </StyledDescription>
                                    <StyledInput
                                        type="tel"
                                        defaultValue={data.phoneNumber}
                                        name="phoneNumber"
                                        pattern="[0-9]{3}-[0-9]{7,8}"
                                    />
                                </div>
                                <div>
                                    <StyledDescription style={marginTop}>
                                        Relationship Status
                                    </StyledDescription>
                                    <StyledInput
                                        type=""
                                        name="relationshipStatus"
                                        value={relationshipStatus}
                                        disabled
                                    />
                                    <span>
                                        <select
                                            style={selectStyle}
                                            defaultValue={relationshipStatus}
                                            onChange={(e) => {
                                                setRelationshipStatus(
                                                    e.target.value
                                                );
                                            }}
                                        >
                                            <option value="In a relationship">
                                                In a Relationship
                                            </option>
                                            <option value="Complicated">
                                                Complicated
                                            </option>
                                            <option value="Single">
                                                Single
                                            </option>
                                            <option value="Prefer not to say">
                                                Prefer not to say
                                            </option>
                                        </select>
                                    </span>
                                </div>
                                <div style={marginTop}>
                                    <StyledDescription style={marginTop}>
                                        Hobbies
                                    </StyledDescription>
                                    {hobbiesForEdit}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "end",
                                        }}
                                    >
                                        <StyledInput
                                            type="text"
                                            id="hobbiesInput"
                                            ref={hobbiesRef}
                                        />
                                        <StyledAddSpan
                                            onClick={addHobby}
                                            htmlFor="hobbiesInput"
                                        >
                                            Add
                                        </StyledAddSpan>
                                    </div>
                                </div>
                                <div style={marginTop}>
                                    <StyledDescription style={marginTop}>
                                        Jobs
                                    </StyledDescription>
                                    {jobsForEdit}
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "end",
                                        }}
                                    >
                                        <StyledInput
                                            type="text"
                                            id="jobsInput"
                                            ref={jobsRef}
                                        />
                                        <StyledAddSpan
                                            onClick={addJobUpdate}
                                            htmlFor="jobsInput"
                                        >
                                            Add
                                        </StyledAddSpan>
                                    </div>
                                </div>
                            </form>
                        </StyledEditDetailContainer>
                        <StyledSubmitForm type="submit" form="editDetailForm">
                            Save Changes
                        </StyledSubmitForm>
                    </StyledOverallContainer>
                </Popup>
            )}
        </div>
    );
}
