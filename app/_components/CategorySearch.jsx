"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import Image from "next/image";
import Link from "next/link";

const CategorySearch = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);

  const A = "A B";
  // console.log(A.split(" ").join(""));

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((res) => {
        console.log(res.data.data);
        setCategoryList(res.data.data);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className=" my-10 flex flex-col items-center px-5">
      <h2 className=" font-bold text-3xl md:text-4xl text-center tracking-wide ">
        Search <span className=" text-primary">Doctors</span>
      </h2>
      <h2 className=" text-sm md:text-xl text-gray-500">
        Search your doctor and book your appointment in one click.
      </h2>

      <div className="flex w-full max-w-sm items-center space-x-2 mt-8">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className=" h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      <div
        className={`mt-8 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 ${
          categoryList?.length >= 1 ? "gap-0" : "gap-2"
        } `}
      >
        {categoryList?.length >= 1
          ? categoryList?.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    href={`/search/${item?.attributes?.Link}`}
                    key={item.id}
                    className=" flex flex-col items-center text-center bg-blue-50 rounded-lg m-2 p-5 gap-1 cursor-pointer hover:scale-110 transition-all ease-in-out"
                  >
                    <Image
                      src={item?.attributes?.Icon?.data[0]?.attributes?.url}
                      alt="icon"
                      width={40}
                      height={40}
                    />
                    <label className=" text-primary text-xs md:text-sm">
                      {item?.attributes?.Name}
                    </label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item.id}
                className=" w-[135px] h-[104px] rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
      </div>
    </div>
  );
};

export default CategorySearch;
