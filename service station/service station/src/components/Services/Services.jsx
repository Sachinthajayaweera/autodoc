import React, { useState } from "react";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const skillsData = [
  {
    name: "Best Prices",
    icon: <FaCameraRetro className="text-5xl" />,
    link: "#",
    shortDescription: "We offer unbeatable prices for top-quality service.",
    longDescription:
      "Our commitment to affordability means you get exceptional service without the high price tag. At AutoDoc, we believe that quality car care shouldn’t break the bank, so we’ve tailored our prices to ensure you’re always getting the best value.",
    aosDelay: "0",
  },
  {
    name: "Fast and Safe",
    icon: <GiNotebook className="text-5xl" />,
    link: "#",
    shortDescription: "Efficient service without compromising safety.",
    longDescription:
      "At AutoDoc, we prioritize both speed and safety in every job. Our expert technicians use state-of-the-art tools and proven techniques to ensure your vehicle is serviced quickly and safely, so you can get back on the road with peace of mind.",
    aosDelay: "500",
  },
  {
    name: "Experienced Workers",
    icon: <SlNote className="text-5xl" />,
    link: "#",
    shortDescription: "Skilled technicians with years of experience.",
    longDescription:
      "Our team of seasoned professionals brings a wealth of knowledge and hands-on experience to every job. With AutoDoc, you’re trusting your vehicle to people who understand cars inside and out, guaranteeing reliable and thorough service.",
    aosDelay: "1000",
  },
];

const Services = () => {
  const [expanded, setExpanded] = useState({});
  const [hovered, setHovered] = useState(null);

  const toggleDescription = (name) => {
    setExpanded((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <>
      <span id="services"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skillsData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark hover:bg-[#C30010] duration-300 text-white rounded-lg"
                onMouseEnter={() => setHovered(skill.name)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="grid place-items-center">
                  <span
                    style={{
                      color: hovered === skill.name ? "white" : "#C30010",
                    }}
                  >
                    {skill.icon}
                  </span>
                </div>
                <h1 className="text-2xl font-bold">{skill.name}</h1>
                <p>
                  {expanded[skill.name] ? skill.longDescription : skill.shortDescription}
                </p>
                <button
                  onClick={() => toggleDescription(skill.name)}
                  className="inline-block text-lg font-semibold py-3"
                  style={{
                    color: hovered === skill.name ? "white" : "#C30010",
                  }}
                >
                  {expanded[skill.name] ? "Show less" : "Learn more"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
