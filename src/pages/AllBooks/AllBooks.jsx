import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";

const AllBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data: books = [] } = useQuery({
    queryKey: ["all-books", "published"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books?status=published`);
      return res.data;
    },
  });

  return (
    <section>
      <h1 className="my-3 text-2xl md:text-3xl lg:text-5xl font-bold text-center text-[#62ab00]">
        All Listed Books: {books.length}
      </h1>
      <p className="text-center">
        Where stories, knowledge, and readers come together
      </p>

      <Container>
        <div className="my-5 pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Link
              key={book._id}
              to={`/book/${book._id}`}
              className="col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl"
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
                      book.bookQuantity > 0 && "text-[#33c24d]"
                    } font-medium text-center`}
                  >
                    Product In Stock
                  </p>
                  <p className="font-bold text-center">TK. {book.bookPrice}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AllBooks;
