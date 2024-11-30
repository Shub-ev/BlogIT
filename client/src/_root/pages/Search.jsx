import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchTag, setSearchTags] = useState();
  const [searchedBlogs, setSearchBlogs] = useState([]);
  const navigator = useNavigate();

  const sampleButtons = ["#nature", "#community", "#society", "#tech"];

  const handleSearchSubmit = async (e) => {

  };

  const redirectToBlog = (blogKey) => {
  };

  return (
    <div className="min-h-screen w-full pt-[7vh] flex flex-col overflow-hidden">
      <div className="w-full md:pl-[80px]">
        <input
          type="text"
          placeholder="search blogs here e.g.nature, tech...."
          className="mt-4 py-2 px-3 md:text-lg bg-white w-full outline-none text-gray-800 rounded-md border-[1px]"
          onChange={(e) => setSearchTags(e.target.value)}
          value={searchTag}
          onKeyDown={handleSearchSubmit}
        />

        <div className="max-w-[90%] flex gap-1 md:gap-3 py-3 text-white font-medium">
          {sampleButtons.map((item, index) => (
            <button key={index} className="list-none bg-blue-400 text-sm md:text-base px-2 py-1 md:px-3 md:py-[0.2rem] rounded-lg">
              {item}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 lg:px-[40px] gap-8">
          {searchedBlogs.map((blog, index) => (
            <div
              className="blogCard rounded-xl mt-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
              key={index}
            >
              <img
                src={blog.imageURL}
                alt=""
                className="h-52 w-full object-cover rounded-xl"
                onClick={() => redirectToBlog(blog.key)}
              />
              <div className="info px-2 pb-2">
                <div
                  className="title w-full pt-4 flex flex-col"
                  onClick={() => redirectToBlog(blog.key)}
                >
                  <span className="text-lg font-semibold">{blog.blogTitle}</span>
                </div>
                <div className="auther flex justify-between items-center mt-2 mb-4">
                  <div className="user flex items-center gap-2">
                    <img
                      src={blog.authorAvatar}
                      alt=""
                      className="h-6 rounded-full"
                    />
                    <span className="text-sm max-w-[160px] truncate">
                      {blog.userName}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
