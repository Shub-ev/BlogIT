import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Signin, Signup } from "./_auth";
import { Toaster } from "react-hot-toast";
import { Home, Search, Post, BlogPage } from './_root/pages/';
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";

const PrivateRoute = () => {
  const user = localStorage.getItem("user");
  // console.log(user);
  return user ? <Outlet /> : <Navigate to="/signin" />;
};

const App = () => {
  return (
    <div className="font-Roboto bg-[#f5f5f5]">
      <Router>
        <Routes>
          {/* Public Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateRoute />}>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              
              {/* <Route path="/trending" element={<Trending />} /> */}
              <Route path="/post" element={<Post />} />
              <Route path="/search" element={<Search />} />
              {/* <Route path="/user" element={<User />} /> */}
              <Route path="/post/:blogKey" element={<BlogPage />} />
             
            </Route>
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
