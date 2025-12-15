import React from "react";
import { FaStarHalfAlt, FaStar } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

const Star = ({ star }) => {
  const stars = Array.from({ length: 5 }, (_, ind) => {
    let num = ind + 0.5;

    return (
      <span>
        {star >= ind + 1 ? (
          <FaStar className="icon" />
        ) : star >= num ? (
          <FaStarHalfAlt className="icon" />
        ) : (
          <AiOutlineStar className="icon" />
        )}
      </span>
    );
  });

  return <div className="icon-style">{stars}</div>;
};

export default Star;
