import axios from "axios";
import { Const } from "../Const";

export async function MutualFriends(user1, user2){
    try{
        const response = await axios.get(`http://${Const}:3001/users/mutual/${user1}/${user2}`)
        return response.data
    }catch(error){
        console.log("error occured on search", error)
    }
}