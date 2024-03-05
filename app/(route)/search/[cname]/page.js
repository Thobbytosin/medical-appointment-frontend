"use client";
import PopularDoctors from "@/app/_components/PopularDoctors";
import GlobalApi from "@/app/_utils/GlobalApi";
import React, { useEffect, useState } from "react";

const Search = ({ params }) => {
  const [doctorsByCategory, setDoctorsByCategory] = useState([]);
  const getDoctorsByCategory = () => {
    GlobalApi.getDoctorsByCategory(params.cname).then((res) => {
      // console.log(res.data.data);
      setDoctorsByCategory(res.data.data);
    });
  };
  useEffect(() => {
    // console.log(params.cname);
    getDoctorsByCategory();
  });
  return (
    <div>
      <PopularDoctors
        heading={
          doctorsByCategory?.length > 1
            ? params.cname + "s"
            : doctorsByCategory?.length === 1 && params.cname
        }
        doctorsList={doctorsByCategory}
      />
    </div>
  );
};

export default Search;
