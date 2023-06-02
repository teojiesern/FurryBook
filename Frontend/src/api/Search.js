import axios from "axios";
import { Const } from "../Const";

export async function Search(queryString){
    try{
        const response = await axios.post(`http://${Const}:3001/users/search`, { query: queryString })
        return response.data
    }catch(error){
        console.log("error occured on search", error)
    }
}