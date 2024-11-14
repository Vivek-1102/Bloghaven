import { useEffect, useState } from "react"
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export interface Blog {
    "content": string;
    "title": string;
    "id": number
    "author": {
        "name": string
    }
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.token == ""){
            navigate("/");
        }
        async function fetchData(){
            const res =await axios.get(`${BACKEND_URL}/api/v1/blog/get/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
              });
            const post = res.data.post;
            setBlog(post);
            setLoading(false);
        }
        

        fetchData();
        
        
    }, [id])

    return {
        loading,
        blog
    }

}
export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.token == ""){
            navigate("/");
        }
        async function fetchData(){
            const res =await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
              });
            const posts = res.data.posts;
            const postArray = posts.reverse();
            setBlogs(postArray);
            setLoading(false);
        }

        fetchData();
    }, [])

    return {
        loading,
        blogs
    }
}

