import React from "react";
import { FaQuoteRight } from "react-icons/fa";

const TestimonialCard = ({ review }) => {
  const { userName, review: comment, user_photoURL } = review;
  return (
    <div className="p-8 rounded-2xl bg-white">
      <FaQuoteRight className="text-[#C3DFE2] text-5xl" />
      <p className="mt-3 text-[#62ab00] text-base font-semibold">{comment}</p>
      <div className="my-6 border border-[#03464D] border-dashed h-0.5"></div>
      <div className="flex items-center gap-5">
        <div className="w-18 bg-[#62ab00] p-1 rounded-full">
          <img src={user_photoURL} className="rounded-full" alt="" />
        </div>
        <div className="">
          <h5 className="text-lg font-extrabold">{userName}</h5>
          <p>Senior Researcher</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
