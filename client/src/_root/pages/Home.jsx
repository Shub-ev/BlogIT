import React, { useContext, useEffect, useState } from "react";
import { MongoContext } from "../../context/mongoContext";
import BlogCard from "../../components/BlogCard";
import ErrorPNG from '../../assets/images/error.png';
import Loader from '../../assets/images/Loader.gif';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { getBlogs } = useContext(MongoContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true);
      const fetchedBlogs = await getBlogs();
      fetchedBlogs != 'Failed to fetch' ? setBlogs(fetchedBlogs) : setBlogs([]);
      setIsLoading(false);
    }

    if (blogs.length == 0) {
      fetchBlogs();
    }

  }, [])

  return (
    <div className="Home mb-20 w-full px-[3vw] pt-[9vh] md:pt-[12vh] md:pl-[80px]">
      {isLoading ? (
        <div className="w-screen h-[80vh] absolute top-14 right-0 flex items-center justify-center">
          <img src={Loader} alt="" className="h-32 md:h-44" />
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
