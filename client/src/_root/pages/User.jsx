import React, { useEffect, useState } from "react";

import { TfiWrite, TfiBookmark, TfiImage } from "react-icons/tfi";
import { SlPeople } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { IoIosHeart } from "react-icons/io";

const User = () => {
  const [image, setImage] = useState();
  const [imageUpload, setImageUpload] = useState(false);
  const [activeSection, setActiveSection] = useState("myBlogs");

  const navigator = useNavigate();

  useEffect(() => {
    userBlogs();
    fetchBlogs();
  }, []);

  const directToPost = async (uBlog) => {
    navigator(`/post/${uBlog.key}`);
  };

  const submitAvatar = async () => {
    try {
      await hanldeAvatarChange(image);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center my-8 md:pl-[80px]">
      <div className="relative">
        <img src={avatar} alt="User Avatar" className="xs:h-32 lg:h-52 rounded-full" />
        <button
          className="absolute right-0 bottom-0 bg-opacity-50 p-[10px] bg-blue-300 rounded-full"
          onClick={() => {
            setImageUpload(!imageUpload);
          }}
        >
          <TfiImage size={18} />
        </button>
      </div>
      <span className="mt-4 xs:text-2xl lg:text-3xl font-semibold">{username}</span>
      <span className="text-sm text-gray-600">{user.email}</span>
      <div className="flex w-full mt-8 xs:justify-between">
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => setActiveSection("myBlogs")}
        >
          <TfiWrite
            size={24}
            className={`${
              activeSection === "myBlogs" ? "text-blue-600" : "black"
            } cursor-pointer`}
          />
        </div>
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => setActiveSection("saved")}
        >
          <TfiBookmark
            size={24}
            className={`${
              activeSection === "saved" ? "text-blue-600" : "black"
            }`}
          />
        </div>
        <div
          className="w-full flex justify-center cursor-pointer"
          onClick={() => setActiveSection("coBlogs")}
        >
          <SlPeople
            size={24}
            className={`${
              activeSection === "coBlogs" ? "text-blue-600" : "black"
            }`}
          />
        </div>
      </div>

      {activeSection === "myBlogs" && (
        <div className="ButtonViews w-full py-4 xs:grid xs:grid-cols-3 lg:flex lg:gap-8">
          {userWBlogs.map((uBlog, index) => (
            <div
              className="UBlog relative"
              key={index}
              onClick={() => directToPost(uBlog)}
            >
              <img
                src={uBlog.imageURL}
                className="xs:h-28 xs:w-28 lg:h-40 lg:w-40 rounded-lg object-cover"
                alt=""
              />
              <div className="count absolute flex gap-1 items-center bottom-2 left-2 bg-white px-2 py-1 rounded-xl">
                <IoIosHeart className="" fill="red" size={20} />
                <span className="text-black font-semibold">
                  {uBlog.likeCount}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === "saved" && (
        <div className="ButtonViews w-full py-4 grid grid-cols-3 gap-3 justify-between">
          {savedBlog.map((blog, index) => (
            <div
              className="UBlog relative object-fill flex justify-center"
              key={index}
              onClick={() => directToPost(blog)}
            >
              <img
                src={blog.imageURL}
                className="h-28 w-28 rounded-lg object-cover"
                alt=""
              />
            </div>
          ))}
        </div>
      )}

      {activeSection === "coBlogs" && <div>CoBlogs Section Content</div>}

      {imageUpload && (
        <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-white bg-opacity-90">
          <div className="flex flex-col gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <div className="w-full flex gap-4">
              <button
                className="bg-[#140F2D] w-full text-white py-2 lg:py-3 text-sm rounded-md hover:bg-black"
                onClick={submitAvatar}
              >
                Post
              </button>
              <button className="bg-red-600 w-full text-white py-2 lg:py-3 text-sm rounded-md hover:bg-red-700" onClick={() => setImageUpload(!imageUpload)}>
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
