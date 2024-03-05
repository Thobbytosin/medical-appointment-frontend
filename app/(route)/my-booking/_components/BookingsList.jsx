import { Button } from "@/components/ui/button";
import { Calendar, Clock, HomeIcon, MapPin } from "lucide-react";
import moment from "moment/moment";
import Image from "next/image";
import React from "react";
import CancelAppointment from "./CancelAppointment";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "@/components/ui/use-toast";
// import CancelAppointment from "./CancelAppointment";

const BookingsList = ({ bookingList, expired, updateRecord }) => {
  console.log(bookingList);
  const onDeleteAppointment = (item) => {
    GlobalApi.deleteAppointment(item.id).then((res) => {
      if (res) {
        toast({
          description: "Booking Appointment deleted",
        });
        updateRecord();
      }
    });
  };
  return (
    <>
      {bookingList &&
        bookingList?.map((item, index) => (
          <div
            key={index}
            className={`${
              expired && "opacity-50"
            } flex items-center gap-4 p-4 border-[1px] rounded-lg mb-4`}
          >
            <Image
              src={
                item?.attributes?.doctor?.data?.attributes?.image?.data
                  ?.attributes?.url
              }
              height={70}
              width={70}
              alt="doctor_image"
              className=" rounded-full w-[70px] h-[70px] object-cover "
            />

            <div className=" w-full">
              <h2
                className={`${
                  !expired ? "text-black" : "text-gray-500"
                } text-[18px] font-semibold flex justify-between items-start w-full`}
              >
                {item?.attributes?.doctor?.data?.attributes?.Name}
                {!expired && (
                  <CancelAppointment
                    onContinueClick={() => onDeleteAppointment(item)}
                  />
                )}
              </h2>
              <h2
                className={`${
                  expired ? "text-gray-500" : "text-primary"
                } text-sm mt-2 flex items-center gap-1 `}
              >
                <HomeIcon />
                <span
                  className={`${!expired && "text-gray-500"} max-w-[400px]`}
                >
                  {item?.attributes?.doctor?.data?.attributes?.Hospital}
                </span>
              </h2>
              <h2
                className={`${
                  expired ? "text-gray-500" : "text-primary"
                } text-sm mt-2 flex items-center gap-1 `}
              >
                <Calendar />
                <span className={`${!expired && "text-black"} max-w-[400px]`}>
                  Appointment On:{" "}
                  {moment(item?.attributes?.Date).format("DD-MM-YYYY")}
                </span>
              </h2>
              <h2
                className={` ${
                  expired ? "text-gray-500" : "text-primary"
                }  text-sm mt-2 flex items-center gap-1 `}
              >
                <Clock />
                <span className={`${!expired && "text-black"} max-w-[400px]`}>
                  At Time: {item?.attributes?.Time}
                </span>
              </h2>
            </div>
          </div>
        ))}
    </>
  );
};

export default BookingsList;
