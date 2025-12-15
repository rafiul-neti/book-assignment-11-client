import { useForm } from "react-hook-form";
import { imageUpload } from "../../utilities/image_upload";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

const AddBookForm = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [bookUploading, setBookUploading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleAddBook = async (data) => {
    setBookUploading(true);
    const bookImageUrl = await imageUpload(data.bookImage[0]);
    const {
      bookName,
      bookAuthor,
      bookPrice,
      bookQuantity,
      bookStatus,
      bookDescription,
    } = data;

    const bookDetails = {
      librarianEmail: user.email,
      bookImage: bookImageUrl,
      bookName,
      bookAuthor,
      bookPrice,
      bookQuantity,
      bookStatus,
      bookDescription,
    };

    console.log(bookDetails);

    axiosSecure
      .post("/books", bookDetails)
      .then((data) => {
        // console.log(data.data);

        if (data.data.insertedId) {
          toast.success(
            "Your book has been added in our collection! Thanks for using our services."
          );

          reset();
        }
      })
      .catch((err) => {
        toast.error(err.message);
      });

    setBookUploading(false);
  };
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit(handleAddBook)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-[#62ab00] rounded-md bg-white"
                {...register("bookName", { required: true })}
                type="text"
                placeholder="Book Name"
              />

              {errors.bookName?.type === "required" && (
                <small className="text-[#bd0018]">Book Name is required.</small>
              )}
            </div>
            {/* Book Status */}
            <div className="space-y-1 text-sm">
              <label htmlFor="category" className="block text-gray-600 ">
                Status
              </label>
              <select
                {...register("bookStatus", { required: true })}
                defaultValue="Select Status"
                className="select w-full px-4 py-3 border border-lime-300 focus:outline-[#62ab00] rounded-md bg-white"
              >
                <option disabled={true} selected={true}>
                  Select Status
                </option>
                <option value="Published">Published</option>
                <option value="Unpublished">Unpublished</option>
              </select>
              {errors.bookStatus?.type === "required" && (
                <small className="text-[#bd0018]">
                  Book Status is Required
                </small>
              )}
            </div>
            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                {...register("bookDescription", { required: true })}
                placeholder="Write book description here..."
                className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-[#62ab00] "
              ></textarea>
              {errors.bookDescription?.type === "required" && (
                <small className="text-[#bd0018]">
                  Book Description is Required.
                </small>
              )}
            </div>
          </div>
          <div className="space-y-6 flex flex-col">
            {/* Book Author */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Author
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-[#62ab00] rounded-md bg-white"
                type="text"
                placeholder="Book Author"
                {...register("bookAuthor", { required: true })}
              />
              {errors.bookAuthor?.type === "required" && (
                <small className="text-[#bd0018]">
                  Book Author Name is Required.
                </small>
              )}
            </div>

            {/* Price & Quantity */}
            <div className="flex justify-between gap-2">
              {/* Price */}
              <div className="space-y-1 text-sm">
                <label htmlFor="price" className="block text-gray-600 ">
                  Price
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-[#62ab00] rounded-md bg-white"
                  type="number"
                  placeholder="Price per unit"
                  {...register("bookPrice", { required: true })}
                />
                {errors.bookPrice?.type === "required" && (
                  <small className="text-[#bd0018]">
                    Book Price is Required.
                  </small>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-1 text-sm">
                <label htmlFor="quantity" className="block text-gray-600">
                  Quantity
                </label>
                <input
                  className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-[#62ab00] rounded-md bg-white"
                  type="number"
                  placeholder="Available quantity"
                  {...register("bookQuantity", { required: true })}
                />
                {errors.bookQuantity?.type === "required" && (
                  <small className="text-[#bd0018]">
                    Book Quantity is Required.
                  </small>
                )}
              </div>
            </div>
            {/* Image */}
            <div className=" p-4 w-full m-auto rounded-lg grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      className="text-sm cursor-pointer w-36"
                      type="file"
                      accept="image/*"
                      {...register("bookImage", { required: true })}
                    />
                    <div className="bg-[#62ab00] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#62ab00]">
                      Upload
                    </div>
                  </label>
                </div>
                {errors.bookImage?.type === "required" && (
                  <small className="text-[#bd0018]">
                    Book Image is Required.
                  </small>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          disabled={bookUploading}
          className="w-full cursor-pointer p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-[#62ab00] "
        >
          {bookUploading ? (
            <span className="flex items-center justify-center">
              <AiOutlineLoading className="animate-spin" />
            </span>
          ) : (
            "Save & Continue"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
