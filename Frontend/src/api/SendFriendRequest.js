import axios from "axios"

export async function SendFriendRequest(receiverId){
    try{
        const senderId = localStorage.getItem("userId")
        const response = await axios.post(`http://localhost:3001/users/send-request`, {
            "senderId": senderId,
            "receiverId": receiverId
          }
          )
        return response.data
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}