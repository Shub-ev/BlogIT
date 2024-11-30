import React, { useContext, useEffect, useState } from 'react';
import User from '../assets/images/user.png'; // Default user avatar
import { IoIosHeart, IoIosBookmark } from "react-icons/io";
import { MongoContext } from '../context/mongoContext';

const BlogCard = ({ blog }) => {
    const { addLike, removeLike } = useContext(MongoContext);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(blog.likes);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setLiked(blog.liked_users.includes(user)); // Check if user liked the blog
    }, [blog.liked_users]);

    const handleDisLike = async () => {
        const blogId = blog._id;
        try {
            const res = await removeLike(blogId);
            console.log(res);
            if (res.success) {
                setLiked(false);
                setLikesCount((prev) => prev - 1);
            }
        } catch (error) {
            console.error('Error disliking the blog:', error);
        }
    };

    const handleLike = async () => {
        const blogId = blog._id;
        try {
            const res = await addLike(blogId);
            if (res.success) {
                setLiked(true);
                setLikesCount((prev) => prev + 1);
            }
        } catch (error) {
            console.error('Error liking the blog:', error);
        }
    };

    const handleSave = async (key) => {
        // Implement the save functionality (saving the blog post)
        console.log('Save blog with key:', key);
    };

    // Determine image source for blog (either base64 or fallback)
    const blogImageSrc = blog.base64Image
        ? `data:image/png;base64,${blog.base64Image}`
        : "/defaultImagePlaceholder.jpg"; // Fallback image, ensure this file exists in the public directory

    // Determine image source for user avatar (either custom avatar or default)
    const authorImageSrc = blog.author.avatar === "default"
        ? User // Default user avatar
        : blog.author.avatar;

    // Add the redirect logic for blog title click (or you can pass it as a prop)
    const redirectToBlog = (key, blogData) => {
        // Logic to redirect to the full blog
        console.log('Redirect to blog with key:', key);
        // You can use React Router for redirecting, e.g., history.push(`/blog/${key}`)
    };

    return (
        <div className="blogCard mb-5 rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            {/* Display blog image */}
            <img
                src={blogImageSrc}
                alt="Blog image"
                className="h-52 w-full object-cover rounded-t-xl"
            />
            <div className="info px-2 pb-2">
                <div
                    className="title w-full pt-4 flex flex-col"
                    onClick={() => redirectToBlog(blog.key, blog)} // Add logic for redirectToBlog
                >
                    <span className="text-lg md:text-xl font-semibold">
                        {blog.title}
                    </span>
                </div>
                <div className="bottom mr-3 flex justify-between items-center">
                    <div className="author flex items-center my-2 gap-2">
                        {/* Display author image */}
                        <img
                            src={authorImageSrc}
                            alt="Author"
                            className="h-5 md:h-6 rounded-full"
                        />
                        <span className="text-sm max-w-[160px] truncate">
                            {blog.user}
                        </span>
                    </div>
                    <div className="icons flex gap-4">
                        <div className="likes flex gap-1 justify-center items-center">
                            {liked ? (
                                <IoIosHeart
                                    style={{ fill: "red" }}
                                    size={20}
                                    onClick={handleDisLike}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <IoIosHeart
                                    style={{
                                        fill: "transparent",
                                        stroke: "gray",
                                        strokeWidth: "44",
                                    }}
                                    size={20}
                                    onClick={handleLike}
                                    className="cursor-pointer"
                                />
                            )}
                            <span className="text-black">{likesCount}</span> {/* Use likesCount */}
                        </div>
                        {blog.saved ? (
                            <IoIosBookmark
                                size={22}
                                color="blue"
                                onClick={() => handleSave(blog.key)}
                                className="cursor-pointer"
                            />
                        ) : (
                            <IoIosBookmark
                                size={22}
                                style={{
                                    fill: "transparent",
                                    stroke: "gray",
                                    strokeWidth: "44",
                                }}
                                className="cursor-pointer"
                                onClick={() => handleSave(blog.key)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
