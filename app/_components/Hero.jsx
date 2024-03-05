import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

function Hero() {
  return (
    <div>
      <section>
        <div class="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            <div class="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
              <Image
                src="/doctors.jpg"
                alt="doctors_image"
                height={800}
                width={800}
                className=" absolute inset-0 h-full w-full rounded-2xl object-cover"
              />
            </div>

            <div class="lg:py-24">
              <h2 class="text-3xl font-bold sm:text-[2.25rem] sm:leading-[2.8rem]">
                Book an{" "}
                <span className=" text-primary mt-4">Appointment Date </span>
                with us Today!
              </h2>

              <p class="mt-4 text-gray-600 text-sm md:text-md">
                With their clinical nature and impersonal feel, doctors’ offices
                can evoke feelings of dread, worry, and detachment. Learning to
                speak up and take an active role in your medical appointments
                can help you feel that you are in collaboration with your
                provider. Book an appointment with us today!
              </p>
              <Button className="mt-5">Explore</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
