"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const PopularDoctors = ({ doctorsList, heading }) => {
  return (
    <div className="px-5">
      <h2 className=" text-xl md:text-3xl font-bold">{heading}</h2>
      <div className=" grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 mt-5 gap-4 ">
        {doctorsList?.length >= 1
          ? doctorsList.map((item, index) => (
              <div
                key={index + 1}
                className=" p-3 border-[1px] rounded-lg cursor-pointer hover:border-primary relative"
              >
                <div key={item?.id} className=" overflow-hidden h-[300px] ">
                  <Image
                    src={item?.attributes?.image?.data?.attributes?.url}
                    alt="doctor_image"
                    width={500}
                    height={300}
                    className=" h-[300px] object-cover  rounded-lg"
                  />
                </div>

                <div className=" px-4 rounded-full py-1 inline-block bg-blue-100 mt-3">
                  <p className=" text-xs text-primary">
                    {item?.attributes?.categories?.data[0]?.attributes?.Name}
                  </p>
                </div>
                <h2 className=" text-[12px] md:text-[16px] font-bold mt-2">
                  {item?.attributes?.Name}
                </h2>
                <h3 className=" text-primary text-[12px] md:text-[14px] mt-1 font-semibold">
                  {item?.attributes?.Year_of_Experience} Years
                </h3>
                <p className=" text-gray-500 text-[10px] md:text-[14px] mt-1 ">
                  {item?.attributes?.Address}
                </p>
                <Link href={`/details/${item?.id}`}>
                  <h2 className=" w-full text-center py-2 text-xs border-[1.5px] border-primary text-primary mt-3 cursor-pointer hover:text-white hover:bg-primary hover:border-none transition-all ease-in-out rounded-full">
                    Book Now
                  </h2>
                </Link>
              </div>
            ))
          : // Skelenton
            [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div key={item.id} className=" p-3 border-[1px] rounded-lg ">
                <div className=" overflow-hidden h-[300px] bg-gray-200 animate-pulse " />

                <div className=" w-[100px] rounded-full h-[24px] inline-block bg-gray-200 animate-pulse mt-3" />

                <h2 className=" h-[24px] w-[120px]  mt-2 bg-gray-200 animate-pulse"></h2>
                <h3 className=" w-[50px] h-[21px] bg-gray-200 animate-pulse mt-1"></h3>
                <p className=" w-[180px] h-[42px] mt-1 bg-gray-200 animate-pulse "></p>
                <h2 className=" w-full h-[35px] mt-3 crounded-full bg-gray-200 animate-pulse"></h2>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PopularDoctors;
