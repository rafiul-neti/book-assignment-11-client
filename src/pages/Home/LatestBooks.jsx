import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import Bookcard from "../../components/Shared/BookCard/Bookcard";

const LatestBooks = () => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["latest-books", "date", "desc"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-books?status=published&limit=8&sortBy=date&sortOrder=desc`
      );
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { result: books = [] } = data || {};

  return (
    <section className="mt-18">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        Latest Books
      </h1>
      <p className="text-center mt-2">
        Discover newly added books from trusted librarians
      </p>

      <>
        <div className="pt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {books.map((book) => (
            <Bookcard key={book._id} book={book} />
          ))}
        </div>
      </>
    </section>
  );
};

export default LatestBooks;
