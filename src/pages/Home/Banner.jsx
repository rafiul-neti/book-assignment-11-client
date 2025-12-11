import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      interval={2000}
      infiniteLoop={true}
      showThumbs={false}
    >
      <div className="flex items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-[#bd0018]">
            Connect With 100+ Libraries
          </h1>
          <p className="text-[#333333]">
            Explore academic, public, and research libraries from one platform.
          </p>
          <button className="btn bg-[#62ab00] text-white">
            Browse All Books
          </button>
        </div>

        <div className="flex-1">
          <img src="https://plus.unsplash.com/premium_photo-1695942301094-472c4dbf9130?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeSUyMHNoZWx2ZXN8ZW58MHx8MHx8fDA%3D&ixlib=rb-4.1.0&q=60&w=3000" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-[#bd0018]">
            Books for Every Subject & Field
          </h1>
          <p className="text-[#333333]">
            From literature to research journals — find everything you need
          </p>
          <button className="btn bg-[#62ab00] text-white">
            View Collection
          </button>
        </div>

        <div className="flex-1">
          <img src="https://freerangestock.com/sample/160529/stack-of-vintage-old-books-on-table.jpg" />
        </div>
      </div>

      <div className="flex items-center">
        <div className="flex-1 space-y-4">
          <h1 className="text-[#bd0018] text-3xl font-bold">
            {" "}
            Get Any Book Delivered to Your Home
          </h1>
          <p className="text-[#333333]">
            Borrow books from partnered libraries and get them delivered
            anywhere.
          </p>
          <button className="btn bg-[#62ab00] text-white">
            Browse All Books
          </button>
        </div>

        <div className="flex-1">
          <img src="https://png.pngtree.com/png-vector/20241107/ourlarge/pngtree-clean-and-inspiring-study-table-setup-with-books-pencils-greenery-perfect-png-image_14315384.png" />
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
