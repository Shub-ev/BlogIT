import React, { useState, useContext } from "react";
import { toast } from 'react-hot-toast';
import { MongoContext } from "../../context/mongoContext";

const Post = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imageType, setImageType] = useState("");
  
  const { createBlog } = useContext(MongoContext);

  const handleSubmitPost = async () => {
    if (!title || !tags || !content) {
      toast.error("Complete all required fields!");
      return;
    }

    try {
      const tagArr = tags.split(",").map(tag => tag.trim());

      const blogData = {
        user: localStorage.getItem("user"),
        title,
        tags: tagArr,
        content,
        imgData: imageBase64,
        contentType: imageType,
      };

      const result = await createBlog(blogData); // Call createBlog from context
      if (result.success) {
        toast.success("Blog posted successfully!");
        clearFields();
      } else {
        toast.error(result.message || "Failed to post the blog.");
      }
    } catch (error) {
      toast.error("An error occurred while posting the blog.");
      console.error(error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (file) {
      // Check if the file type is a valid image
      if (!validImageTypes.includes(file.type)) {
        toast.error("Invalid image type. Please upload a valid image (JPEG, PNG, GIF, WEBP).");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result);
        setImageType(file.type); // Store the correct MIME type
      };
      reader.readAsDataURL(file);
    }
  };

  const clearFields = () => {
    setTitle("");
    setTags("");
    setContent("");
    setImageBase64("");
    setImageType("");
  };

  return (
    <div className="BlogPost w-full h-[100vh] pt-[5vh] md:pt-[7vh] bg-[#f5f5f5] flex items-start gap-20">
      <div className="post w-full flex flex-col gap-5 px-2 py-6 mb-14 md:ml-[80px] lg:w-[45vw] mx-auto">
        <span className="text-3xl md:text-5xl tracking-wider font-semibold text-gray-800">Create Post!</span>
        <input
          type="text"
          placeholder="Blog Title"
          className="outline-none text-xl md:text-3xl font-bold px-3 py-2 md:py-4 bg-white rounded-md border-gray-200 border-[1px]"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="tags i.e.#hunger, #metoo, #saynotodrugs"
          className="outline-none text-sm md:text-lg px-3 py-2 bg-white rounded-md border-gray-200 border-[1px]"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <textarea
          cols="30"
          rows="15"
          className="text-sm md:text-lg px-3 py-2 outline-none rounded-md bg-white border-gray-200 border-[1px]"
          placeholder="Enter Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="image flex text-sm md:text-lg flex-col gap-4 bg-white rounded-md border-gray-200 border-[1px] p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="button w-full flex gap-4">
          <button
            className="bg-[#140F2D] w-full text-white py-2 lg:py-3 text-sm md:text-lg rounded-md hover:bg-black"
            onClick={handleSubmitPost}
          >
            Post
          </button>
          <button
            className="bg-red-600 w-full text-white py-2 lg:py-3 text-sm md:text-lg rounded-md hover:bg-red-700"
            onClick={clearFields}
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
