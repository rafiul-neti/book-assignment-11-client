import React from "react";
import { Link } from "react-router";
import Coverage from "../Home/Coverage";
import { IoLocation } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";

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
    <section className="my-10 w-11/12 mx-auto p-2 lg:p-0">
      <div className="my-10 text-gray-700 text-lg font-bold flex items-center gap-1.5">
        <Link to={`/`}>Home</Link>
        <span>{">"}</span>
        <p className="text-[#62ab00] cursor-pointer">Contact</p>
      </div>

      <div className="">
        <Coverage />
      </div>

      <div className="flex">
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Location & Details
          </h1>
          <p className="text-gray-600">
            Discover our nearest service hubs, explore the comprehensive
            offerings at each branch, and see how we can serve your needs in
            your district.
          </p>

          {locationDetails.map((detail, i) => (
            <div key={i}>
              <detail.icon />
              <p>
                <span>{detail.iconFor}: </span>{detail.iconMsg}
              </p>
            </div>
          ))}
        </div>

        <div className="flex-1 lg:flex-2">
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSeiFkQGjkZLdUXPE4DbyTSzthFULog0gIV1iKX27aVTGvm7mQ/viewform?embedded=true"
            width="100%"
            height="400"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
