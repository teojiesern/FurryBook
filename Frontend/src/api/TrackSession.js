import axios from "axios"

export async function TrackSession(sessionUrl){
    try{
        const response = await axios.post(`http://localhost:3001/users/trackSession`, sessionUrl)
        return "success tracking"
    }catch(error){
        console.log("an error occured" + error)
    }
    return null
}