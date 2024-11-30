import React from "react";
import { GoHome, GoSearch, GoGraph, GoPerson } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
const BottomBar = () => {
  const navigator = useNavigate();
  const location = useLocation();

  const routes = [
    { path: "/", icon: <GoHome size={24}/> },
    { path: "/search", icon: <GoSearch size={24} /> },
    { path: "/post", icon: <MdOutlineAddBox size={26} /> },
    // { path: "/trending", icon: <GoGraph size={24} /> },
    { path: "/user", icon: <GoPerson size={24} /> },
  ];

  const currentRoute = routes.find((route) => location.pathname === route.path);

  return (
    <div className="">
      <ul className="flex justify-between px-8 w-full py-[1rem] fixed bg-white bottom-0 left-0">
        {routes.map((route, index) => (
          <li key={index} onClick={() => navigator(route.path)}>
            {/* Apply a highlight class if the route matches the current route */}
            {currentRoute && currentRoute.path === route.path ? (
              <span className="text-blue-600">{route.icon}</span>
            ) : (
              route.icon
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BottomBar;
