import React, { useContext, useEffect, useState } from 'react';
import User from '../assets/images/user.png'; // Default user avatar
import { IoIosHeart, IoIosBookmark } from "react-icons/io";
import { MongoContext } from '../context/mongoContext';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    const { addLike, removeLike } = useContext(MongoContext);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(blog.likes);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setLiked(blog.liked_users.includes(user));
    }, [blog.liked_users]);

    const handleDisLike = async (e) => {
        e.stopPropagation();
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

    const handleLike = async (e) => {
        e.stopPropagation();
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
        console.log('Save blog with key:', key);
    };

    const authorImageSrc = blog.avatar === "default"
        ? User
        : blog.avatar;

    const redirectToBlog = (key, blogData) => {
        console.log('Redirect to blog with key:', key);
    };

    return (
        <Link to={"/post/"+blog._id}>
            <div className="blogCard mb-5 rounded-xl bg-white border-[1px] border-gray-200 cursor-pointer">
                {/* Display blog image */}
                <img
                    src={blog.base64Image ? `${blog.base64Image}` : "/defaultImagePlaceholder.jpg"}
                    alt="Blog image"
                    className="h-52 w-full object-cover rounded-t-xl"
                />
                <div className="info px-4 pb-2">
                    <div
                        className="title w-full pt-4 flex flex-col"
                        onClick={() => redirectToBlog(blog.key, blog)} // Add logic for redirectToBlog
                    >
                        <span className="text-lg md:text-xl font-semibold">
                            {blog.title}
                        </span>
                    </div>
                    <div className="bottom flex justify-between items-center">
                        <div className="author flex items-center my-2 gap-2">
                            {/* Display author image */}
                            <img
                                src={authorImageSrc}
                                alt="Author"
                                className="h-7 md:h-8 rounded-full"
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
                                        size={24}
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
                                        size={24}
                                        onClick={handleLike}
                                        className="cursor-pointer"
                                    />
                                )}
                                <span className="text-black">{likesCount}</span> {/* Use likesCount */}
                            </div>
                            {blog.saved ? (
                                <IoIosBookmark
                                    size={26}
                                    color="blue"
                                    onClick={() => handleSave(blog.key)}
                                    className="cursor-pointer"
                                />
                            ) : (
                                <IoIosBookmark
                                    size={26}
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
        </Link>
    );
};

export default BlogCard;
