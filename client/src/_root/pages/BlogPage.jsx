import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IoIosBookmark, IoIosHeart } from "react-icons/io";

const BlogPage = () => {
  const [blog, setBlog] = useState({});
  

  useEffect(() => {
    const fetchBlog = async () => {

    }
  }, []);

  return (
    <div className="BlogDetail mt-5 mb-16 md:ml-[80px] md:w-[900px]">
      <img
        src={selectedBlog.imageURL}
        alt=""
        className="h-52 w-full object-cover rounded-md"
      />
      <div className="info px-2 pb-2 mt-2">
        <div className="title w-full pt-3 flex flex-col">
          <h1 className="text-2xl font-semibold">{selectedBlog.blogTitle}</h1>
        </div>
        <div className="auther flex justify-between items-center mt-2 mb-4">
          <div className="user flex items-center gap-2">
            <img
              src={selectedBlog.authorAvatar}
              alt=""
              className="h-6 rounded-full"
            />
            <span className="text-sm max-w-[160px] truncate">
              {selectedBlog.authorName}
            </span>
          </div>
          <div className="likeAndsave flex items-center gap-5">
            {selectedBlog.Liked ? (
              <IoIosHeart
                style={{ fill: "red" }}
                size={20}
                onClick={() => addLike(selectedBlog.key)}
              />
            ) : (
              <IoIosHeart
                style={{
                  fill: "transparent",
                  stroke: "gray",
                  strokeWidth: "44",
                }}
                size={20}
                onClick={() => addLike(selectedBlog.key)}
              />
            )}
            {selectedBlog.saved ? (
              <IoIosBookmark
                size={22}
                color="blue"
                onClick={() => handleSaveBlog(selectedBlog.key)}
              />
            ) : (
              <IoIosBookmark
                size={22}
                style={{
                  fill: "transparent",
                  stroke: "gray",
                  strokeWidth: "44",
                }}
                onClick={() => handleSaveBlog(selectedBlog.key)}
              />
            )}
          </div>
        </div>
        {selectedBlog.blogTags.map((tag, index) => (
          <span className="text-sm font-bold">{tag} </span>
        ))}
        <p className="text-sm mt-4 text-justify">{selectedBlog.blogContent}</p>
      </div>
    </div>
  );
};

export default BlogPage;
