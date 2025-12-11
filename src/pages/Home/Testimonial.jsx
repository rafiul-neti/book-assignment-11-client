import React from "react";
import Reviews from "./Reviews";

const reviewsPromise = fetch("/reviews.json").then((result) => result.json());

const Testimonial = () => {
  return (
    <div className="mt-18">
      <div className="my-10">
        <h1 className="mb-2 font-bold text-5xl text-[#62ab00] text-center">
          What our customers are saying
        </h1>
        <p className="text-center text-[#333333]">
          Experience a smarter way to access knowledge. BookCourier helps
          students, researchers, and readers borrow and return books
          effortlessly—without long queues or library visits—so learning stays
          smooth, convenient, and always within reach.
        </p>
      </div>
      <div className="">
        <Reviews reviewsPromise={reviewsPromise} />
      </div>
    </div>
  );
};

export default Testimonial;
