"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingsList from "./_components/BookingsList";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";

const Booking = () => {
  const { user } = useKindeBrowserClient();
  const [bookingsList, setBookingsList] = useState([]);
  useEffect(() => {
    user && getUserBookingsList();
  }, [user]);
  const getUserBookingsList = () => {
    GlobalApi.getUserBookingList(user?.email).then((res) => {
      setBookingsList(res.data.data);
      // console.log(bookingsList);
    });
  };

  const filterBookings = (type) => {
    const result = bookingsList?.filter((item) =>
      type === "upcoming"
        ? new Date(item?.attributes?.Date) >= new Date()
        : new Date(item?.attributes?.Date) <= new Date()
    );

    console.log(result);
    return result;
  };

  return (
    <div className=" mt-10 px-5">
      <h2 className=" font-bold text-lg md:text-2xl">My Booking</h2>

      <Tabs defaultValue="upcoming" className="w-full mt-8">
        <TabsList className="w-full justify-start">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <BookingsList
            bookingList={filterBookings("upcoming")}
            updateRecord={() => getUserBookingsList()}
          />
        </TabsContent>
        <TabsContent value="expired">
          <BookingsList
            bookingList={filterBookings("expired")}
            expired={true}
            updateRecord={() => getUserBookingsList()}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Booking;
