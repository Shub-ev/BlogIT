import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from "../assets/images/Logo.png";
import Google from "../assets/images/google.png";
import Facebook from "../assets/images/facebook.png";
import Loader from '../assets/images/DarkLoader.svg';
import { MongoContext } from "../context/mongoContext";
import toast from "react-hot-toast";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useContext(MongoContext);
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (user) {
  //     navigator("/");
  //   }
  // }, [user, navigator]);

  const handleForm = async (e) => {
    try{
      setIsLoading(true);
      e.preventDefault();
      if(email == "" && password == "") {
        toast.error("Enter Authentication Details!")
      };
      const data = {
        "email": email,
        "password": password,
      }

      const res = await loginUser(data);

      if(res[0]){
        toast.success("Login successful!");
        setEmail("");
        setPassword("");
        navigator("/");
      }
      else{
        toast.error(res[1]);
      }
    }
    finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="SigninPage">
      {/* <div className="ifLarge xs:hidden md:flex md:flex-col gap-4 items-center justify-center fixed top-0 bg-white left-0 w-screen h-screen">
        <span className="text-5xl font-bold">Error</span>
        <span className="text-lg underline">Website is currently available for Mobile screens only</span>
      </div> */}
      <div className="SigninForm bg-gray-100 w-screen h-screen flex justify-center items-center">
        <form
          action=""
          className="flex flex-col rounded-lg bg-white gap-2 w-[400px] lg:w-[440px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] px-8 py-6 lg:px-10 lg:py-8 mx-6"
        >
          <div className="flex justify-center mb-4">
            <img src={Logo} alt="" className="h-8 lg:h-10" />
          </div>
          <span className="text-2xl lg:text-3xl font-semibold text-[#140F2D]">
            Welcome back!
          </span>

          <div className="inputs flex flex-col my-5">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 outline-none bg-blue-50 rounded-md"
              placeholder="Enter Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-2 outline-none bg-blue-50 mt-5 rounded-md"
              placeholder="Enter Password"
            />
            <span className="text-right text-sm text-gray-700 mt-2">
              Don't have account?{" "}
              <span
                className="text-base text-blue-700 font-semibold cursor-pointer"
                onClick={() => navigator("/signup")}
              >
                Sign up
              </span>
            </span>
          </div>
          <button className="bg-[#140F2D] text-white rounded-md py-2 lg:py-3 text-sm" onClick={isLoading ? null : handleForm}>
            {
              isLoading ? 
              (<div className="flex gap-1 justify-center"><img src={Loader} alt="" className="h-5" />Loading</div>) : 
              (<>Login</>)
            }
          </button>

          <div className="divider flex gap-3 items-center">
            <div className="lineL w-full bg-gray-300 h-[1.2px]"></div>
            <span className="text-center text-[16px] text-gray-600 my-6">
              or
            </span>
            <div className="lineR w-full bg-gray-300 h-[1.2px]"></div>
          </div>

          <div className="LoginOnIcon flex gap-3">
            <div className="cursor-pointer flex justify-center py-2 rounded-md items-center gap-2 w-full border-[1.4px] border-gray-300">
              <img src={Google} alt="" className="h-4" />
              <span className="text-sm text-gray-700">Google</span>
            </div>
            <div className="cursor-pointer flex justify-center py-2 rounded-md items-center gap-2 w-full border-[1.4px] border-gray-300">
              <img src={Facebook} alt="" className="h-4" />
              <span className="text-sm text-gray-700">Facebook</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
