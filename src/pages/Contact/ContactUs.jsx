import React from "react";
import { Link } from "react-router";
import Coverage from "../Home/Coverage";
import { IoLocation } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { MdPhoneAndroid } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import ContactForm from "./ContactForm";

const ContactUs = () => {
  const locationDetails = [
    {
      icon: IoLocation,
      iconFor: "Come to See Us",
      iconMsg: "Le Meridien Hotel",
      iconMsg2: "79/A Commercial Area, Khilkhet, Dhaka",
    },
    {
      icon: IoIosMail,
      iconFor: "Conatct by Email",
      iconMsg: `info@bookcourier.com`,
      iconMsg2: "contact@bookcourier.com",
    },
    {
      icon: MdPhoneAndroid,
      iconFor: "Contact by Phone",
      iconMsg: `(880) 1777 8888 997`,
      iconMsg2: "(880) 1223 4478 665",
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
          <h1 className="mb-10 text-3xl md:text-4xl text-gray-700 font-semibold">
            Send Us a Message
          </h1>
          <ContactForm />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {locationDetails.map((location, i) => (
          <div
            key={i}
            className="space-y-5 p-1.5 flex flex-col items-center justify-center"
          >
            <div className="aspect-square w-28 flex justify-center items-center border border-[#62ab00] rounded-full">
              <location.icon className="text-[#62ab00] text-3xl font-black" />
            </div>

            <div className="text-center">
              <h1 className="text-lg font-black">{location.iconFor}</h1>
              <p>{location.iconMsg}</p>
              <p>{location.iconMsg2}</p>
            </div>
          </div>
        ))}

        <div className="space-y-5 flex flex-col items-center justify-center">
          <div className="aspect-square w-28 flex justify-center items-center border border-[#62ab00] rounded-full">
            <TiGroup className="text-[#62ab00] text-3xl font-black" />
          </div>

          <div className="text-center space-y-1.5">
            <h1 className="text-lg font-black">BookCourier Social</h1>
            <div className="mx-4 flex items-center justify-between">
              <Link
                to={`https://www.facebook.com/r.a.f.i.u.l.i.s.l.a.m.1.2.3.5/`}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5em"
                  height="2.5em"
                  viewBox="0 0 256 256"
                >
                  <title xmlns="">facebook</title>
                  <path
                    fill="#1877F2"
                    d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"
                  />
                  <path
                    fill="#FFF"
                    d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"
                  />
                </svg>
              </Link>

              <Link to={`https://x.com/irafiul210`} target="_blank">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="2em"
                  viewBox="0 0 14 14"
                >
                  <title xmlns="">twitter</title>
                  <g fill="none">
                    <g clip-path="url(#SVGG1Ot4cAD)">
                      <path
                        fill="currentColor"
                        d="M11.025.656h2.147L8.482 6.03L14 13.344H9.68L6.294 8.909l-3.87 4.435H.275l5.016-5.75L0 .657h4.43L7.486 4.71zm-.755 11.4h1.19L3.78 1.877H2.504z"
                      />
                    </g>
                    <defs>
                      <clipPath id="SVGG1Ot4cAD">
                        <path fill="#fff" d="M0 0h14v14H0z" />
                      </clipPath>
                    </defs>
                  </g>
                </svg>
              </Link>

              <Link
                to={`https://www.linkedin.com/in/irafiul210`}
                target="_blank"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2.5em"
                  height="2.5em"
                  viewBox="0 0 256 256"
                >
                  <title xmlns="">linkedin-icon</title>
                  <path
                    fill="#0A66C2"
                    d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.91 39.91 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186zM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009s9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97zM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
