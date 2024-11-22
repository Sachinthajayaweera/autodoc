import React from "react";
import CarPng from "../../assets/car1.png";

const About = () => {
  return (
    <>
    <span id="about"></span>
    <div className="dark:bg-dark bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div data-aos="slide-right" data-aos-duration="1500">
            <img
              src={CarPng}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1
                data-aos="fade-up"
                className="text-3xl sm:text-4xl font-bold font-serif"
              >
                About us
              </h1>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
              At AutoDoc, we believe that every vehicle deserves expert attention and every driver deserves peace of mind. Established with a passion for quality and reliability, AutoDoc has grown into a trusted name in vehicle care. Our experienced team combines technical expertise with a commitment to exceptional service, ensuring your car gets the best treatment possible—whether it's a quick tune-up, a thorough inspection, or major repairs.
              </p>
              <p data-aos="fade-up">
              We pride ourselves on transparency, honesty, and a job done right the first time. With cutting-edge tools, genuine parts, and a dedication to customer satisfaction, AutoDoc isn’t just a service station—it’s where your car finds its best health. Welcome to AutoDoc, where your journey always starts with confidence.
              </p>
              <button
                data-aos="fade-up"
                className="rounded-md px-6 py-2 border-2 transition duration-300"
                style={{
                  borderColor: "#c30010", // Red outline color
                  color: "#c30010",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#c30010"; // Lighter red on hover
                  e.target.style.color = "white";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.color = "#c30010";
                }}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
