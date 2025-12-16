import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const BookDataRow = ({ book, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isUpdating, setIsUpdating] = useState(false);

  const handlleUpdateStatus = (id, status) => {
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
          setIsUpdating(true);
          const res = await axiosSecure.patch(`/books/${id}`, changedStatus);

          if (res.data.modifiedCount) {
            refetch();
            toast.success(`Your book's status has been updated to ${status}!`);
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setIsUpdating(false);
        }
      }
    });
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={book.bookImage}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-left">{book.bookName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">{book.bookAuthor}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${
            book.bookStatus === "Published"
              ? "text-green-800 bg-green-200"
              : "text-red-700 bg-red-200"
          } text-center font-medium px-2 py-1 rounded-lg`}
        >
          {book.bookStatus}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">
          <span className="text-xl font-bold">৳</span>
          {book.bookPrice}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">{book.bookQuantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
        <button
          onClick={() =>
            handlleUpdateStatus(
              book._id,
              book.bookStatus === "Published" ? "Unpublished" : "Published"
            )
          }
          className="btn bg-[#62ab00] text-white text-nowrap"
        >
          {isUpdating ? (
            <span className="flex items-center justify-center">
              <TbFidgetSpinner className="animate-spin" />
            </span>
          ) : (
            `Change to ${
              book.bookStatus === "Published" ? "Unpublished" : "Published"
            }`
          )}
        </button>
      </td>
    </tr>
  );
};

export default BookDataRow;
