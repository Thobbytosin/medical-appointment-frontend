"use client";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";
import DoctorDetail from "../_components/DoctorDetail";
import Suggestion from "../_components/Suggestion";

const Details = ({ params }) => {
  const [doctor, setDoctor] = useState();
  const [doctorsList, setDoctorsList] = useState([]);
  let [updateDoctorsList, setUpdateDoctorsList] = useState();
  useEffect(() => {
    getDoctor();
    getDoctorsList();
    // console.log(params);
  }, []);
  const updateDoc = doctorsList?.filter((item) => {
    return item?.id !== doctor?.id;
  });
  updateDoctorsList = updateDoc;
  // console.log(updateDoctorsList);

  const getDoctor = () => {
    GlobalApi.getDoctorsById(params.recordId).then((res) => {
      // console.log(res.data.data);
      setDoctor(res.data.data);
    });
  };
  const getDoctorsList = () => {
    GlobalApi.getDoctorsList().then((res) => {
      // console.log(res.data.data);
      setDoctorsList(res.data.data);
    });
  };

  return (
    <div className=" mt-[2.2rem] md:mt-[3rem]">
      <h2 className=" font-bold text-[22px]">Details</h2>
      <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-6 mt-[1.4rem] md:mt-[2rem]">
        {/* DOCTOR DETAIL */}
        <div className=" col-span-3">
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>

        {/* DOCTOR SUGGESTION LIST */}
        <div>
          <Suggestion doctors={updateDoctorsList} />
        </div>
      </div>
    </div>
  );
};

export default Details;
