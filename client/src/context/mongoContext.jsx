import { createContext, useContext, useEffect, useState } from "react";
export const MongoContext = createContext();

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        localStorage.getItem("user");
    }, []);

    const createUser = async (userData) => {
        try {
            const response = await fetch(`http://localhost:8531/user/blogIT/auth/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            const res = await response.json();

            if (!res.success) {
                console.log(res.message);
                return [res.success, res.message];
                // throw new Error(`Failed to create user: ${res.message}`);
            }

            console.log("User created:", res);
            localStorage.setItem("email", data.email);
            localStorage.setItem("user", data.username);
            return res.message;

        } catch (err) {
            console.error("Error creating user:", err);
            return err.message;
        }
    };

    const loginUser = async (userData) => {
        try {
            console.log(userData);
            const response = await fetch("http://localhost:8531/user/blogIT/auth/loginUser", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                setUser(data.user);
                localStorage.setItem("email", data.email);
                localStorage.setItem("user", data.username);
                return [data.success, data.message];
            }
            else {
                return [data.success, data.message];
            }
        }
        catch (err) {
            console.log('Error logging in user!' + err);
            return err.message;
        }
    }

    const getBlogs = async () => {
        try {
            const response = await fetch("http://localhost:8531/user/blogIT/blog/getBlogs");

            const data = await response.json();
            // console.log(data);
            console.log(data.blogs);

            if (data.success) {
                return data.blogs;
            }
            else {
                return [];
            }
        }
        catch (err) {
            console.log('Error fetching blogs!' + err);
            return err.message;
        }
    }

    const createBlog = async (blogData) => {
        try {
            console.log(blogData);
            const response = await fetch("http://localhost:8531/user/blogIT/blog/createPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            const data = await response.json();
            console.log(data);
            return data;
        } catch (err) {
            console.error("Error creating blog:", err);
            return { success: false, message: err.message };
        }
    };


    const addLike = async (blogId) => {
        try {
            const likeData = {
                blogId: blogId,
                email: localStorage.getItem("user"),
            }
            console.log(likeData);
            const response = await fetch("http://localhost:8531/user/blogIT/blog/likeBlog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(likeData)
            });

            const data = await response.json();
            console.log(data);
            if (data.success) {
                return data;
            }
            else {
                return data;
            }
        }
        catch (err) {
            console.log('Error fetching blogs!' + err);
            return err.message;
        }
    }

    const removeLike = async (blogid) => {
        try {
            const likeData = {
                blogId: blogid,
                email: localStorage.getItem("user"),
            }
            const response = await fetch("http://localhost:8531/user/blogIT/blog/unlikeBlog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(likeData),
            });

            const data = await response.json();
            console.log(data);
            if (data.success) {
                return data;
            }
            else {
                return data;
            }
        }
        catch (error) {
            console.log('Error fetching blogs!' + error);
            return error.message;
        }
    }

    const fetchBlog = async () => {
        try{
            
        }
        catch (error) {
            console.log('Error fetching blogs!' + error);
            return error.message;
        }
    }

    return (
        <MongoContext.Provider value={{ createUser, loginUser, getBlogs, createBlog, addLike, removeLike, fetchBlog, user }}>
            {children}
        </MongoContext.Provider>
    );
};
