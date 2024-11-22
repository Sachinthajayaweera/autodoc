import React, { useEffect } from "react";
import carPng from "../../assets/car.png";
import redCar from "../../assets/banner-car.png";
import AOS from "aos";

const Hero = ({ theme }) => {
  useEffect(() => {
    AOS.refresh();
  });

  return (
    <div className="dark:bg-black dark:text-white duration-300 ">
      <div className="container min-h-[620px] flex">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div
            data-aos="zoom-in"
            data-aos-duration="1500"
            data-aos-once="false"
            className="order-1 sm:order-2"
          >
            <img
              src={theme === "dark" ? carPng : redCar}
              alt=""
              className="sm:125 relative -z-10 max-h-[600px] drop-shadow-[2px_20px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div className="space-y-5 order-2 sm:order-1 sm:pr-32 ">
            <p data-aos="fade-up" className="text-2xl font-serif" style={{ color: "#C30010" }}>
              Your
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="600"
              className="text-5xl lg:text-7xl font-semibold font-serif"
            >
              Trusted Partner for Every Mile
            </h1>
            <p data-aos="fade-up" data-aos-delay="1000">
            At AutoDoc, we’re dedicated to keeping your vehicle in peak condition with expert care and reliable service. From routine maintenance to complex repairs, our skilled technicians have you covered—so you can hit the road with confidence. Drive in, drive out, and stay on track with AutoDoc!{" "}
            </p>
            <button
              data-aos="fade-up"
              data-aos-delay="1500"
              onClick={() => {
                AOS.refreshHard();
              }}
              className="rounded-md bg-[#c30010] hover:bg-[#c30010]/80 transition duration-500 py-2 px-6 text-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
