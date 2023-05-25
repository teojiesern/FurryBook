import axios from "axios";

export async function profilePageData(userId) {
  try {
    const response = await axios.get(`http://localhost:3001/users/${userId}`);
    return response.data;
  } catch (error) {
    console.log("an error occurred" + error);
  }
  return null;
}