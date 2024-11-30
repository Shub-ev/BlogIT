import React, { useContext, useEffect, useState } from "react";
import Loader from '../../assets/images/WhiteLoader.svg';
import { MongoContext } from "../../context/mongoContext";
import BlogCard from "../../components/BlogCard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getBlogs } = useContext(MongoContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      const fetchedBlogs = await getBlogs();
      console.log(fetchedBlogs);
      fetchedBlogs ? setBlogs(fetchedBlogs) : setBlogs([]);
      // console.log(blogs);
    }

    if (blogs.length == 0) {
      fetchBlogs();
    }

  }, [])

  return (
    <div className="Home mb-20 w-full px-[3vw] pt-[9vh] md:pt-[12vh] md:pl-[80px]">
      {isLoading ? (
        <div className="w-screen h-[80vh] absolute top-14 right-0 flex items-center justify-center">
          <img src={Loader} alt="" className="h-9 mt-14" />
        </div>
      ) : (
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-x-8">
          {blogs.map((blog, index) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
