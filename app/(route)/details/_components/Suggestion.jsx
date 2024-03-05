import Image from "next/image";
import Link from "next/link";
import React from "react";

const Suggestion = ({ doctors }) => {
  //   console.log(doctors);
  return (
    <div className=" p-4 border-[1px] rounded-lg">
      <h2 className=" font-semibold text-lg">Suggestions</h2>
      <div>
        {doctors?.map((doctor) => (
          <Link
            className="cursor-pointer"
            key={doctor?.id}
            href={`/details/${doctor?.id}`}
          >
            <div className=" flex items-center gap-4 py-6 border-b-[1px]">
              <Image
                src={doctor?.attributes?.image?.data?.attributes?.url}
                height={70}
                width={70}
                alt="doctor-image"
                className=" w-[70px] h-[70px] rounded-full object-cover"
              />
              <div>
                <div className=" px-4 rounded-full py-1 inline-block bg-blue-100">
                  <p className=" text-[10px] text-primary">
                    {doctor?.attributes?.categories?.data[0]?.attributes?.Name}
                  </p>
                </div>
                <h4 className=" font-bold text-[12px] my-2">
                  {doctor?.attributes?.Name}
                </h4>
                <p className=" text-[12px] text-primary">
                  {doctor?.attributes?.Year_of_Experience} Years
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Suggestion;
