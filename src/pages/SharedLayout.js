import React from "react";
import { Outlet } from "react-router";
import { Navbar, Footer, Sidebar } from "../components";

const SharedLayout = () => {
  return (
    <>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
};

export default SharedLayout;
