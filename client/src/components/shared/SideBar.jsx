import React from "react";
import Logo from "../../assets/images/Logo.png";
import { GoHome, GoPerson, GoSearch } from "react-icons/go";
import { MdOutlineAddBox } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const SideBar = () => {
  const navigator = useNavigate();
  const routes = [
    { path: "/", icon: <GoHome size={24} />, title: "Home" },
    { path: "/search", icon: <GoSearch size={24} />, title: "Search" },
    { path: "/post", icon: <MdOutlineAddBox size={26} />, title: "Post" },
    // { path: "/trending", icon: <GoGraph size={24} /> },
    { path: "/user", icon: <GoPerson size={24} />, title: "User" },
  ];

  const currentRoute = routes.find((route) => location.pathname === route.path);

  return (
    <div className="SideBar fixed translate-y-[50%] flex flex-col gap-4">
      {routes.map((route, index) => (
        <button
          key={index}
          onClick={() => navigator(route.path)}
          className={`${
            currentRoute && currentRoute.path === route.path
              ? "bg-blue-950"
              : "bg-blue-500"
          } flex justify-center rounded-2xl transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600 text-white hover:shadow-md`}
        >
          {/* Apply a highlight class if the route matches the current route */}
          {currentRoute && currentRoute.path === route.path ? (
            <span className="text-white p-3">{route.icon}</span>
          ) : (
            <span className="text-white p-3">{route.icon}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SideBar;
