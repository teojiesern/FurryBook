import axios from "axios"
import { Const } from "../Const"

export async function AcceptFriendRequest(senderId){
    try{
        const receiverId = localStorage.getItem("userId")
        const response = await axios.post(`http://${Const}:3001/users/accept-request`, {
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