import React from "react";
import Navbar from "../components/shared/Navbar";
import { Outlet } from "react-router-dom";
import BottomBar from "../components/shared/BottomBar";
import SideBar from "../components/shared/SideBar";

const RootLayout = () => {
  return (
    <div className="relative">
      <Navbar />

      <section className="px-4 flex lg:px-20">
        <div className="xs:hidden bg-pink-400 md:block h-[50vh] max-w-[100px] translate-y-[50%] flex flex-col items-center justify-center fixed md:left-6 lg:left-20">
          <SideBar />
        </div>
        <Outlet />
      </section>

      <div className="xs:block md:hidden">
        <BottomBar />
      </div>
    </div>
  );
};

export default RootLayout;
