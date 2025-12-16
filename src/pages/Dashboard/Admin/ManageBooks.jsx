import React from "react";
import Container from "../../../components/Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ManageBooks = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["all-books"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-books`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { result: allbooks = [], totalBooks } = data || {};

  const handleBookStatus = (id, status) => {
    // console.log({ id, status });
    const changedStatus = { status };

    Swal.fire({
      title: "Are you sure?",
      text: "Take your actions carefully.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I wanna change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/books/${id}`, changedStatus);

          if (res.data.modifiedCount) {
            refetch();
            toast.success(`Your book's status has been updated to ${status}!`);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  const handleDeleteBook = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I wanna Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/books/${id}`);
          // console.log(res.data)
          if (res.data.bookDeletation.deletedCount) {
            toast.success("You've successfully deleted a book.");
            refetch();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  return (
    <section>
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#62ab00] text-center">
        Manage Books
      </h1>
      <p className="text-center mt-5 mb-8 text-2xl font-bold">
        Total Books: {totalBooks}
      </p>

      <Container>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th className="text-center font-bold text-base text-gray-900">
                  Book Info
                </th>
                <th className="text-center font-bold text-base text-gray-900">
                  Librarian
                </th>
                <th className="text-center font-bold text-base text-gray-900">
                  Status
                </th>
                <th className="text-center font-bold text-base text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allbooks.map((book) => (
                <tr key={book._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={book.bookImage} alt="Book Image" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{book.bookName}</div>
                        <div className="text-sm text-left">
                          Tk.{book.bookPrice}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{book.librarianEmail}</td>
                  <td
                    className={`${
                      book.bookStatus === "Published"
                        ? "text-green-700"
                        : "text-red-700"
                    } font-bold`}
                  >
                    {book.bookStatus}
                  </td>
                  <td>
                    <>
                      {book.bookStatus === "Published" ? (
                        <button
                          onClick={() =>
                            handleBookStatus(book._id, "Unpublished")
                          }
                          className="btn btn-sm rounded-md px-4 py-2 text-sm font-medium text-yellow-900 border border-yellow-600 focus:outline-none focus:ring-2 bg-yellow-100 hover:bg-yellow-200 active:bg-yellow-700 focus:ring-yellow-400"
                        >
                          Unpublish
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleBookStatus(book._id, "Published")
                          }
                          className="btn btn-sm cursor-pointer inline-flex justify-center rounded-md border border-green-600 bg-green-100 px-4 py-2 text-base font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                        >
                          Publish
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteBook(book._id)}
                        className="mx-2 btn btn-sm cursor-pointer inline-flex justify-center rounded-md border border-red-600 bg-red-100 px-4 py-2 text-base font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      >
                        Delete
                      </button>
                    </>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
};

export default ManageBooks;
