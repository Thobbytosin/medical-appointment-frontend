import { Button } from "@/components/ui/button";
import { GraduationCap, HomeIcon, LocateIcon, MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookingAppointment from "./BookingAppointment";

const socialMediaLinks = [
  {
    id: 1,
    icon: "/twitter.png",
  },
  {
    id: 2,
    icon: "/facebook.png",
  },
  {
    id: 3,
    icon: "/linkedin.png",
  },
  {
    id: 4,
    icon: "/youtube.png",
  },
];
const DoctorDetail = ({ doctor }) => {
  // console.log(doctor);
  return (
    <>
      <div className=" grid grid-cols-1 md:grid-cols-3 gap-8 border-[1px] rounded-lg p-4">
        {/* Doctor Image */}
        <div>
          <Image
            src={doctor?.attributes?.image?.data?.attributes?.url}
            height={200}
            width={200}
            alt="doctor-image"
            className=" rounded-lg w-full object-cover h-[300px]"
          />
        </div>
        {/* Doctor Info */}
        <div className=" col-span-2 mt-5">
          <h2 className=" font-semibold text-lg md:text-2xl">
            {doctor?.attributes?.Name}
          </h2>
          <div>
            <h2 className=" text-gray-500 text-sm mt-2 flex items-center gap-1">
              <GraduationCap />
              <span>
                {doctor?.attributes?.Year_of_Experience} Years of Experience
              </span>
            </h2>
            <h2 className=" text-gray-500 text-sm mt-2 flex items-center gap-1">
              <HomeIcon />
              <span>{doctor?.attributes?.Hospital}</span>
            </h2>
            <h2 className=" text-gray-500 text-sm mt-2 flex items-center gap-1 ">
              <MapPin />
              <span className=" max-w-[400px]">
                {doctor?.attributes?.Address}
              </span>
            </h2>
            <div className=" px-4 rounded-full py-1 inline-block bg-blue-100 mt-4">
              <p className=" text-xs text-primary">
                {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
              </p>
            </div>
            <div className=" mt-5 flex gap-2 items-center">
              {socialMediaLinks.map((link) => (
                <Image
                  key={link.id}
                  src={link.icon}
                  height={30}
                  width={30}
                  className=" rounded-full object-cover cursor-pointer"
                />
              ))}
            </div>

            <BookingAppointment doctor={doctor} />
          </div>
        </div>
      </div>
      <div className=" mt-10 border-[1px] rounded-lg p-4">
        <h2 className=" font-semibold text-xl">About Me</h2>
        <p className=" text-gray-600 font-normal mt-4">
          {doctor?.attributes?.About[0]?.children[0]?.text}
        </p>
      </div>
    </>
  );
};

export default DoctorDetail;
