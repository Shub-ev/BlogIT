import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MongoContext } from '../context/mongoContext';

import Logo from "../assets/images/Logo.png";
import Google from "../assets/images/google.png";
import Facebook from "../assets/images/facebook.png";
import toast from "react-hot-toast";
import Loader from "../assets/images/DarkLoader.svg";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const navigator = useNavigate();
  const { createUser, } = useContext(MongoContext); 
  const [isLoading, setIsLoading] = useState(false);


  const handleForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    console.log("form submit");

    if(password != password1 || username == ""){
      toast.error("Password Didn't match!");
      setIsLoading(false);
      return;
    }
    else if(password.length < 8){
      toast.error("Password is too small!");
      setIsLoading(false)
      return;
    }

    const userData = {
      email,
      password,
      username
    }

    console.log(userData)

    const res = await createUser(userData);
    console.log(res);

    if(res[0]){
      toast.success("User created successfully!");
      setEmail("");
      setPassword("");
      setPassword1("");
      setUsername("");
      navigator("/");
    }
    else{
      toast.error(res[1]);
    }


    setIsLoading(false);
  };

  return (
    <div className="SignupPage">
      {/* `<div className="ifLarge xs:hidden md:flex md:flex-col gap-4 items-center justify-center fixed top-0 bg-white left-0 w-screen h-screen">
        <span className="text-5xl font-bold">Error</span>
        <span className="text-lg underline">Website is currently available for Mobile screens only</span>
      </div>` */}
      <div className="SignupForm bg-gray-100 w-screen h-screen flex justify-center items-center">
        <form
          action=""
          className="flex flex-col rounded-lg bg-white gap-2 w-[400px] lg:w-[440px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-8 py-6 lg:px-10 lg:py-8 mx-6"
        >
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="" className="h-8 lg:h-10" />
          </div>
          <span className="text-2xl lg:text-3xl font-semibold text-[#140F2D]">
            Create a new Account
          </span>
          <div className="inputs flex flex-col my-5">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="px-4 py-2 outline-none bg-blue-50 rounded-md"
              placeholder="Create username"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 outline-none bg-blue-50 mt-5 rounded-md"
              placeholder="Enter Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 outline-none bg-blue-50 mt-5 rounded-md"
              placeholder="Enter Password"
            />
            <input
              type="password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className="px-4 py-2 outline-none bg-blue-50 mt-5 rounded-md"
              placeholder="Enter Password again"
            />
            <span className="text-right text-sm text-gray-700 mt-2">
              Already have an Account?{" "}
              <span
                className="text-base text-blue-700 font-semibold cursor-pointer"
                onClick={() => navigator("/signin")}
              >
                Login
              </span>
            </span>
          </div>
          <button className="bg-[#140F2D] rounded-md text-white py-2 lg:py-3 text-sm" onClick={isLoading ? null : handleForm}>
            {isLoading ? (
              <div className="flex gap-1 justify-center">
                <img src={Loader} alt="" className="h-5" />
                Loading
              </div>
            ) : (
              <>Sign Up</>
            )}
          </button>
          <div className="divider flex gap-3 items-center">
            <div className="lineL w-full bg-gray-300 h-[1.2px]"></div>
            <span className="text-center text-[16px] text-gray-600 my-6">
              or
            </span>
            <div className="lineR w-full bg-gray-300 h-[1.2px]"></div>
          </div>

          <div className="LoginOnIcon flex gap-3">
            <div className=" flex cursor-pointer justify-center py-2 rounded-md items-center gap-2 w-full border-[1.4px] border-gray-300">
              <img src={Google} alt="" className="h-4" />
              <span className="text-sm text-gray-700">Google</span>
            </div>
            <div className=" flex cursor-pointer justify-center py-2 rounded-md items-center gap-2 w-full border-[1.4px] border-gray-300">
              <img src={Facebook} alt="" className="h-4" />
              <span className="text-sm text-gray-700">Facebook</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
