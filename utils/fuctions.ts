import axios from "./axios.config"

export const getPosts = async () =>{
    try {
        const res = await axios.get("/posts")
        return res.data
    } catch (error) {
        throw error
    }
}

export const createPost = async (title: string, body: string, userId: number) =>{
    try {
        const res = await axios.post("/posts", {title, body, userId})
        return res.data
    } catch (error) {
        throw error
    }
}

export const getComments = async (postId: number)=>{
    try {
        const res = await axios.get(`/posts/${postId}/comments`)
        return res.data
    } catch (error) {
        throw error
    }
}

export const deletePost = async (postId: number)=>{
    try {
        const res = await axios.delete(`/posts/${postId}`)
        return res.data
    } catch (error) {
        throw error
    }
}