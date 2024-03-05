"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import GlobalApi from "@/app/_utils/GlobalApi";
import Link from "next/link";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";

const CategoryList = () => {
  const ref = useRef();
  const [categoryList, setCategoryList] = useState([]);
  const [scrollY, setScrollY] = useState("");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileScroll, setMobileScroll] = useState(false);

  const controlScroll = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 5 && window.scrollY < 220) {
      setScrollY("fixed");
    } else if (window.scrollY >= 220) {
      setScrollY("");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlScroll);
    return () => {
      window.removeEventListener("scroll", controlScroll);
    };
  }, [lastScrollY]);

  const params = usePathname();
  const categoryName = params.split("/")[2];
  // console.log(categoryName);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.getCategory()
      .then((res) => {
        // console.log(res.data.data);
        setCategoryList(res.data.data);
      })
      .catch((err) => console.error(err));
  };
  return (
    <div ref={ref} className={`h-full ${scrollY} flex flex-col `}>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className="overflow-visible">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {categoryList?.map((item, index) => (
              <CommandItem>
                <Link
                  href={`/search/${item?.attributes?.Link}`}
                  className={`text-[12px] flex items-center gap-2 text-primary rounded-md cursor-pointer w-full p-2 ${
                    categoryName === item?.attributes?.Link && "bg-blue-100"
                  }`}
                >
                  <Image
                    src={item?.attributes?.Icon?.data[0]?.attributes?.url}
                    alt="icon"
                    width={25}
                    height={25}
                  />
                  <label>{item?.attributes?.Name}</label>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
