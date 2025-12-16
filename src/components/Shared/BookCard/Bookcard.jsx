import React from "react";
import { Link } from "react-router";

const Bookcard = ({ book }) => {
  return (
    <Link
      to={`/book/${book._id}`}
      className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl bg-gray-50"
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
              aspect-square 
              w-full 
              relative 
              overflow-hidden 
              rounded-xl
            "
        >
          <img
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={book.bookImage}
            alt="Book Image"
          />
          <div
            className="
              absolute
              top-3
              right-3
            "
          ></div>
        </div>
        <div className="font-semibold text-xl">
          <h4 className="text-center">{book.bookName}</h4>
        </div>
        <div className="">
          <p className="text-center">{book.bookAuthor}</p>
          <p
            className={`${
              book.bookQuantity > 0 ? "text-[#33c24d]" : "text-rose-700"
            } font-medium text-center`}
          >
            {book.bookQuantity > 0 ? "Product In Stock" : "Out Of Stock"}
          </p>
          <p className="font-bold text-center">TK. {book.bookPrice}</p>
        </div>
      </div>
    </Link>
  );
};

export default Bookcard;
