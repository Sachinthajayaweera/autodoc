import React from "react";

const Contact = () => {
  return (
    <>
      <span id="contact-us"></span>
      <div data-aos="zoom-in" className="dark:bg-black dark:text-white py-14">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-800 py-8 px-6">
            <div className="col-span-2 space-y-3">
              <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Have a question about our services?
              </h1>
              <p className="text-gray-400">
              Interested in scheduling an appointment? Get in touch with us today! 
              Our team is ready to provide the reliable, top-quality service that AutoDoc is known for
              </p>
            </div>
            <div className="sm:grid sm:place-items-center">
              <a
                href="#"
                className="inline-block font-semibold py-2 px-6 bg-[#C30010] text-white hover:bg-[#C30010]/80 duration-200 tracking-widest uppercase"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
