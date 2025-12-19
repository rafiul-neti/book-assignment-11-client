import React from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ star, size }) => {
  const stars = Array.from({ length: 5 }, (_, ind) => {
    let num = ind + 0.5;

    return (
      <span key={ind}>
        {star >= ind + 1 ? (
          <FaStar size={size} className="icon" />
        ) : star >= num ? (
          <FaStarHalfAlt size={size} className="icon" />
        ) : (
          <AiOutlineStar size={size} className="icon" />
        )}
      </span>
    );
  });

  return <div className="icon-style">{stars}</div>;
};

export default Star;
