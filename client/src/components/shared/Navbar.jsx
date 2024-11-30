import React, { useContext, useState } from "react";
import Logo from "../../assets/images/Logo.png";
import { MdLogout } from "react-icons/md";
import { MongoContext } from "../../context/mongoContext";
import { Navigate, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigator = useNavigate();

    const handelSignout = async () => {
      // console.log("user ", localStorage.getItem("user"));
      localStorage.removeItem("user");
      navigator("/signin");
    }

  return (
    <div className={`fixed w-[100vw] bg-[#f5f5f5] xs:px-4 md:px-8 lg:px-16 xs:h-14 lg:h-18 flex top-0 md:top-2 lg:top-4 justify-between items-center`}>
       <img src={Logo} alt="" className="xs:h-6 md:h-8 lg:h-10 cursor-pointer" onClick={() => navigator("/")}/>
       <div className="left">
        <button onClick={handelSignout} className=" md:bg-blue-500 hover:bg-blue-950 transition-colors duration-300 ease-in-out md:px-4 flex items-center justify-center gap-3 md:py-2 rounded-xl">
            <MdLogout size={26} className="text-[bg-[#140F2D]] xs:text-black md:text-white"/>
            <span className="hidden md:block text-sm text-white">LOGOUT</span>
        </button>
       </div>
    </div>
  );
};

export default Navbar;
