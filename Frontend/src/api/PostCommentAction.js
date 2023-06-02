import axios from "axios";
import { Const } from "../Const";

export async function PostCommentAction({ request }) {
    const formData = await request.formData();
    const comment = formData.get("comment");
    const postId = formData.get("postId");
    const user = localStorage.getItem("userId");

    try {
        const response = await axios.post(
            `http://${Const}:3001/comments/${user}`,
            {
                commentBody: comment,
                postId: postId,
            }
        );
        return response.data
    } catch (error) {
        console.log("error occured: " + error);
        return null
    }
}