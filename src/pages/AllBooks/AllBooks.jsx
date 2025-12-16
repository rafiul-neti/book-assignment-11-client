import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Container from "../../components/Shared/Container";
import { Link } from "react-router";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const AllBooks = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: [
      "all-books",
      "published",
      debouncedSearch,
      sortOrder,
      currentPage,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-books?status=published&limit=12&skip=${
          currentPage * 12
        }&sortBy=price&sortOrder=${sortOrder}&searchByTitle=${debouncedSearch}`
      );

      return res.data;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const books = data?.result || [];
  const booksCount = data?.totalBooks || 0;
  const totalPages = Math.ceil(booksCount / 12);

  // console.log({ booksCount, total: data?.totalBooks, totalPages });

  const handleSortByPrice = (e) => {
    const sortValue = e.target.value;
    const order = sortValue.split("-")[1];
    setSortOrder(order);
  };

  // console.log(sortOrder);

  return (
    <section>
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-[#62ab00]">
        All Listed Books
      </h1>
      <p className="text-center">
        Where stories, knowledge, and readers come together
      </p>
      <Container>
        <div className="">
          <span>Total Book found: ({booksCount})</span>
        </div>

        <div className="mt-10 flex justify-between items-center">
          {/* search */}
          <label className="input outline-[#62ab00]">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(0);
              }}
              type="search"
              className="grow"
              placeholder="Search by Book Title"
            />
          </label>

          {/* sort by price */}
          <select
            defaultValue=""
            onChange={handleSortByPrice}
            className="select bg-white"
          >
            <option value="" disabled={true}>
              Sort by: Price
            </option>
            <option value="price-asc">Price: Low - High</option>
            <option value="price-desc">Price: High - Low</option>
          </select>
        </div>

        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="pt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
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
                          book.bookQuantity > 0
                            ? "text-[#33c24d]"
                            : "text-rose-700"
                        } font-medium text-center`}
                      >
                        {book.bookQuantity > 0
                          ? "Product In Stock"
                          : "Out Of Stock"}
                      </p>
                      <p className="font-bold text-center">
                        TK. {book.bookPrice}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </>

        {/* pagination pages */}
        <div className="mb-5 mt-10 w-11/12 mx-auto flex flex-wrap items-center gap-2 justify-center">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn capitalize"
            >
              prev
            </button>
          )}
          {[...Array(totalPages).keys()].map((btnNum, ind) => {
            return (
              <button
                onClick={() => setCurrentPage(btnNum)}
                key={ind}
                className={`btn ${
                  btnNum === currentPage && "bg-[#62ab00] text-white"
                }`}
              >
                {btnNum + 1}
              </button>
            );
          })}
          {currentPage < totalPages - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn capitalize"
            >
              next
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default AllBooks;
