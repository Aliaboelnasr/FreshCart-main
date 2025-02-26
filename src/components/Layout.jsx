import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import img from "../assets/images/light-patten.svg";

export default function Layout() {
  return (
    <div
      style={{ backgroundImage: `url(${img})` }}
      className="flex flex-col justify-between h-screen"
    >
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
}
