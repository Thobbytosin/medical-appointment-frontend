"use client";
import React, { useRef } from "react";
import CategoryList from "./_components/CategoryList";

const layout = ({ children }) => {
  return (
    <div className=" grid grid-cols-4 mt-[2.2rem] md:mt-[3rem] overflow-visible min-h-screen">
      <div className=" md:block hidden">
        {/* Category */}
        <CategoryList />
      </div>
      <div className=" col-span-3">{children}</div>
    </div>
  );
};

export default layout;
