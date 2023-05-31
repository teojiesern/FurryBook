import axios from "axios"

export async function DeclineFriendRequest(senderId){
    try{
        const receiverId = localStorage.getItem("userId")
        const response = await axios.post(`http://localhost:3001/users/decline-request`, {
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