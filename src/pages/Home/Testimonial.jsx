import React from "react";
import Reviews from "./Reviews";

const reviewsPromise = fetch("/reviews.json").then((result) => result.json());

const Testimonial = () => {
  return (
    <div className="mt-18">
      <div className="my-10">
        <h1 className="mb-2 text-2xl md:text-3xl  font-bold text-center">
          What our customers are saying
        </h1>
        <p className="text-center text-[#333333]">
          Experience a smarter way to access knowledge. BookCourier helps
          students, researchers, and readers borrow and return books
          effortlessly
          <span className="hidden lg:block">
            —without long queues or library visits—so learning stays smooth,
            convenient, and always within reach.
          </span>
        </p>
      </div>
      <div className="">
        <Reviews reviewsPromise={reviewsPromise} />
      </div>
    </div>
  );
};

export default Testimonial;
