import React from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PlantDataRow = ({ book, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handlleUpdateStatus = (id, status) => {
    const changedStatus = { status };

    // console.log({id, status})

    Swal.fire({
      title: "Are you sure?",
      text: "Take your actions carefully.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I wanna change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/books/${id}`, changedStatus)
          .then((res) => {
            // console.log(res)
            if (res.data.modifiedCount) {
              refetch();
              toast.success(
                `Your book's status has been updated to ${status}!`
              );
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
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
        <p className="text-gray-900 text-center">{book.bookName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">{book.bookAuthor}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">{book.bookStatus}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">{book.bookPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 text-center">{book.bookQuantity}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() =>
            handlleUpdateStatus(
              book._id,
              book.bookStatus === "Published" ? "Unpublished" : "Published"
            )
          }
          className="btn bg-[#62ab00] text-white"
        >
          Change to{" "}
          {book.bookStatus === "Published" ? "Unpublished" : "Published"}
        </button>
      </td>
    </tr>
  );
};

export default PlantDataRow;
