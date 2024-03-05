"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";

const BookingAppointment = ({ doctor }) => {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();
  const { user } = useKindeBrowserClient();

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00AM",
      });
      timeList.push({
        time: i + ":30AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00PM",
      });
      timeList.push({
        time: i + ":30PM",
      });
    }

    setTimeSlot(timeList);
  };

  const isPastDay = (day) => {
    return day <= new Date();
  };
  useEffect(() => {
    console.log(doctor);
    getTime();
  }, []);
  useEffect(() => {
    // console.log(user);
  }, [user]);

  const saveBookingDetails = () => {
    const data = {
      data: {
        UserName: user.given_name + " " + user.family_name,
        Email: user.email,
        Time: selectedTimeSlot,
        Date: date,
        Note: [
          {
            type: "paragraph",
            children: [
              {
                type: "text",
                text: note,
              },
            ],
          },
        ],
        doctor: doctor.id,
        doctorName: doctor.attributes.Name,
        doctorHospital: doctor.attributes.Hospital,
      },
    };

    console.log(data);

    GlobalApi.bookingAppointment(data)
      .then((resp) => {
        console.log(resp);
        if (resp) {
          GlobalApi.sendEmail(data)
            .then((resp) => {
              console.log(resp);
            })
            .catch((err) => {
              console.log(err);
            });
          toast({
            description: "Booking Confirmation sent on Email",
          });
          setNote("Write your Note..");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-5">Book an Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Booking Appointment</DialogTitle>
          <DialogDescription>
            <div>
              <div className=" grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                {/* CALENDAR */}
                <div>
                  <h2 className=" text-primary my-5 flex gap-2 items-center">
                    <CalendarDays />
                    <span className=" text-black">Select Date</span>
                  </h2>
                  {/* Calendar */}
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>

                {/* TIME SLOT */}

                <div>
                  <h2 className=" text-primary my-5 flex gap-2 items-center">
                    <Clock />
                    <span className=" text-black">Select Time Slot</span>
                  </h2>
                  <div className=" grid grid-cols-3 gap-2 p-2 border-[1px] rounded-lg">
                    {timeSlot?.map((time, index) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(time.time)}
                        className={`p-2 rounded-full border-[1px] text-center cursor-pointer hover:bg-primary hover:text-white transition-all ease-in-out ${
                          selectedTimeSlot === time?.time &&
                          "bg-primary text-white"
                        }`}
                      >
                        {time?.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                className="mt-5"
                placeholder="Write your Note.."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <>
              <Button
                className="text-red-500 border-red-500"
                type="button"
                variant="outline"
              >
                Close
              </Button>
              <Button
                onClick={() => saveBookingDetails()}
                type="button"
                disabled={!(date && selectedTimeSlot)}
              >
                Submit
              </Button>
            </>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingAppointment;
