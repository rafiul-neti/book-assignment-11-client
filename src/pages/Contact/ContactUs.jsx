import React from "react";
import { Link } from "react-router";
import Coverage from "../Home/Coverage";
import { IoLocation } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  const locationDetails = [
    {
      icon: IoLocation,
      iconFor: "Address",
      iconMsg: "1229-Le Meridien Hotel, 79/A Commercial Area, Khilkhet, Dhaka",
    },
    {
      icon: IoIosMail,
      iconFor: "Mail",
      iconMsg: "info@bookcourier.com",
    },
    {
      icon: MdPhoneAndroid,
      iconFor: "Phone",
      iconMsg: "(880) 1777 8888 997",
    },
  ];

  return (
    <section className="mb-10 w-11/12 mx-auto p-1 lg:p-0">
      <div className="mt-3 mb-10 text-gray-700 text-lg font-bold flex items-center gap-1.5">
        <Link to={`/`}>Home</Link>
        <span>{">"}</span>
        <p className="text-[#62ab00] cursor-pointer">Contact</p>
      </div>

      <div className="flex gap-7 lg:gap-10 flex-col lg:flex-row-reverse">
        <div className="flex-1 rounded shadow">
          <Coverage />
        </div>
        <div className="flex-1 border border-gray-400 p-3 rounded shadow">
          <h1 className="mb-10 text-3xl md:text-4xl lg:text-5xl text-gray-700 font-semibold">
            Send Us a Message
          </h1>
          <ContactForm />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-3 gap-10">
        {locationDetails.map((location, i) => (
          <div
            key={i}
            className="space-y-5 flex flex-col items-center justify-center"
          >
            <div className="aspect-square w-28 flex justify-center items-center border border-[#62ab00] rounded-full">
              <location.icon className="text-[#62ab00] text-3xl font-black" />
            </div>

            <div className="text-center">
              <h1>Contact by phone</h1>
              <p>880147896325</p>
              <p>880147896325</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactUs;
