"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import CategorySearch from "./_components/CategorySearch";
import PopularDoctors from "./_components/PopularDoctors";
import Footer from "./_components/Footer";
import { useEffect, useState } from "react";
import GlobalApi from "./_utils/GlobalApi";

export default function Home() {
  const [doctorsList, setDoctorsList] = useState([]);

  const getDoctorsList = () => {
    GlobalApi.getDoctorsList().then((res) => {
      console.log(res.data.data);
      setDoctorsList(res.data.data);
    });
  };

  useEffect(() => {
    getDoctorsList();
  }, []);
  return (
    <div>
      {/* HERO SECTION */}
      <Hero />

      {/* CATEGORY SEARCH */}
      <CategorySearch />

      {/* POPULAR DOCTORS */}
      <PopularDoctors doctorsList={doctorsList} heading="Popular Doctors" />
    </div>
  );
}
