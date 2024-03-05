"use client";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@radix-ui/react-popover";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";

const Header = () => {
  const Menu = [
    {
      id: 1,
      title: "Home",
      path: "/",
    },

    {
      id: 2,
      title: "Explore",
      path: "/explore",
    },

    {
      id: 3,
      title: "Contact Us",
      path: "/contact-us",
    },
  ];

  const { user } = useKindeBrowserClient();

  useEffect(() => {
    // console.log(user);
    user &&
      toast({
        description: "Logged in Succesfully",
      });
  }, [user]);

  const userName = user?.given_name?.split("")[0];

  const logout = () => {
    return toast({
      variant: "destructive",
      description: "Logged out",
    });
  };

  return (
    <div className=" flex items-ce,nter justify-between p-4 shadow-sm">
      <div className=" flex gap-10 items-center">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />

        <ul className=" hidden md:flex gap-8">
          {Menu.map((item, i) => (
            <Link href={item.path}>
              <li
                key={i}
                className=" hover:text-primary cursor-pointer hover:scale-105 font-medium transition-all ease-in-out"
              >
                {item.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {user?.email ? (
        <Popover>
          <PopoverTrigger>
            <div
              className={`rounded-full h-[50px] w-[50px] bg-primary  ${
                user?.picture === null
                  ? "border-cyan-300 border-[2px]"
                  : "border-primary border-[2px]"
              } flex justify-center items-center`}
            >
              {user?.picture === null && (
                <span className=" font-bold text-2xl text-white ">
                  {userName}
                </span>
              )}
              {user?.picture !== null && (
                <Image
                  src={user?.picture}
                  width={50}
                  height={50}
                  className=" rounded-full"
                />
              )}
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-44">
            <ul className="">
              <Link href={"/my-booking"}>
                <li className=" rounded-md hover:bg-slate-100 cursor-pointer w-full p-2">
                  My Booking
                </li>
              </Link>
              <li
                onClick={() => logout()}
                className=" rounded-md hover:bg-slate-100 cursor-pointer w-full p-2"
              >
                <LogoutLink>Log out</LogoutLink>
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : (
        // <Button variant="outline">
        //   <LogoutLink>Log out</LogoutLink>
        // </Button>
        <LoginLink>
          <Button>Get Started</Button>
        </LoginLink>
      )}
    </div>
  );
};

export default Header;
