import React, { useState } from "react";
import whiteCar from "../../assets/white-car.png";
import car2 from "../../assets/car5.png";
import car3 from "../../assets/car6.png";

const serviceList = [
  {
    name: "Car Wash",
    price: 500,
    image: whiteCar,
    aosDelay: "0",
  },
  {
    name: "Engine Checkup",
    price: 3000,
    image: car2,
    aosDelay: "500",
  },
  {
    name: "Tire Replacement",
    price: 3500,
    image: car3,
    aosDelay: "1000",
  },
  {
    name: "Interior Cleaning",
    price: 7500,
    image: whiteCar,
    aosDelay: "1500",
  },
  {
    name: "Oil Change",
    price: 2500,
    image: car2,
    aosDelay: "2000",
  },
  {
    name: "Brake Service",
    price: 4500,
    image: car3,
    aosDelay: "2500",
  },
  {
    name: "Battery Replacement",
    price: 6500,
    image: whiteCar,
    aosDelay: "3000",
  },
  {
    name: "Suspension Repair",
    price: 9300,
    image: car2,
    aosDelay: "3500",
  },
  {
    name: "Alignment Service",
    price: 10000,
    image: car3,
    aosDelay: "4000",
  },
];

const ServiceList = () => {
  const [visibleCount, setVisibleCount] = useState(3); // Initial visible card count

  const loadMoreServices = () => {
    setVisibleCount(visibleCount + 6); // Load 6 more cards
  };

  return (
    <div className="pb-24">
      <div className="container">
        {/* Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl font-semibold font-serif mb-3"
        >
          Our Services
        </h1>

        {/* Service listing */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {serviceList.slice(0, visibleCount).map((data) => (
              <div
                key={data.name}
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                className="space-y-3 border-2 border-gray-300 hover:border-[#C30010] p-3 rounded-xl relative group"
              >
                <div className="w-full h-[120px]">
                  <img
                    src={data.image}
                    alt={data.name}
                    className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"
                  />
                </div>
                <div className="space-y-2">
                  <h1 className="font-semibold text-[#C30010] group-hover:text-white group-hover:border-[#C30010]">
                    {data.name}
                  </h1>
                  <div className="flex justify-between items-center text-xl font-semibold">
                    <p>{data.price}LKR</p>
                    <a href="#" className="text-[#C30010] hover:underline">
                      Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End of Service listing */}

        {/* View More Button */}
        {visibleCount < serviceList.length && (
          <div className="grid place-items-center mt-8">
            <button
              onClick={loadMoreServices}
              data-aos="fade-up"
              className="button-outline border-2 border-[#C30010] text-[#C30010] hover:bg-[#C30010] hover:text-white duration-300 py-2 px-6 rounded-md"
            >
              View More
            </button>
          </div>
        )}

        {/* Get Started Button */}
        <div className="grid place-items-center mt-8">
          <button
            data-aos="fade-up"
            className="button-outline border-2 border-[#C30010] text-[#C30010] hover:bg-[#C30010] hover:text-white duration-300 py-2 px-6 rounded-md"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceList;
