import axios from "axios"

export async function GetSession() {
  try {
    const response = await axios.get("http://localhost:3001/users/getSession");
    const decodedSession = decodeURIComponent(response.data);
    const sessionUrls = decodedSession.split(",");

    const sanitizedSessionUrls = sessionUrls.map(url => url.replace(/=+$/, ""));

    return sanitizedSessionUrls;
  } catch (error) {
    console.log("An error occurred: " + error);
  }
  return null;
}
