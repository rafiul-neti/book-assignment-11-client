import React, { useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Star from "../Shared/Star/Star";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const ReviewRatingModal = ({ isOpen, closeModal, book, rating, setRating }) => {
  const { bookImage, bookName, bookAuthor, bookPrice } = book;
  const [ratingError, setRatingError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { register, handleSubmit } = useForm();

  const handleSubmitReviewRating = async (data) => {
    if (!rating) {
      return setRatingError("Please give the rating.");
    }

    const bookId = book.bookId ? book.bookId : book._id;
    console.log(bookId);

    // console.log(data);
    const reviewInfo = {
      bookId,
      reviewerEmail: user.email,
      reviewerName: user.displayName,
      givenRating: Number(rating),
      ...data,
    };

    try {
      setSubmitting(true);
      const res = await axiosSecure.post(`/ratings-reviews`, reviewInfo);
      if (res.data.insertedId) {
        toast.success("Your review has been submitted.");
      } else if (res.data.message) {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeModal();
      setSubmitting(false);
    }
  };

  const handleRatingStar = (starNum) => {
    setRating(starNum);
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none "
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
          >
            <DialogTitle
              as="h3"
              className="text-2xl text-center font-medium leading-6 text-gray-900"
            >
              Write A Review
            </DialogTitle>
            <hr className="my-5 text-gray-300" />

            <div className="mt-2">
              <div className="flex gap-5">
                <div className="flex-1">
                  <img src={bookImage} alt="" />
                </div>

                <div className="flex-1">
                  <p className="text-lg font-medium">{bookName}</p>
                  <p>{bookAuthor}</p>
                  <p>Tk.{bookPrice}</p>
                </div>
              </div>
            </div>
            <hr className="my-5 text-gray-300" />

            <div className="mb-5 flex items-center justify-center">
              {!rating ? (
                <select
                  onChange={(e) => handleRatingStar(e.target.value)}
                  defaultValue={`Select Rating`}
                  className={`select w-full border-2 ${
                    ratingError
                      ? "outline-2 outline-rose-700"
                      : "border-lime-300 focus:outline-[#62ab00]"
                  }`}
                >
                  <option disabled value="Select Rating">
                    Select Your Rating
                  </option>
                  <option value="1">1 Star - Very Bad</option>
                  <option value="2">2 Star - Bad</option>
                  <option value="3">3 Star - Good</option>
                  <option value="4">4 Star - Very Good</option>
                  <option value="5">5 Star - Good & Recommended</option>
                </select>
              ) : (
                <Star star={rating} size={36} />
              )}
            </div>

            <form>
              <div className="">
                <textarea
                  {...register("reviewText")}
                  placeholder="Describe your experience (optional)"
                  className="block rounded-md focus:lime-300 w-full h-32 px-4 py-3 text-gray-800  border border-lime-300 bg-white focus:outline-[#62ab00] "
                ></textarea>
              </div>
            </form>

            {ratingError && (
              <small className="my-2 text-red-600 block text-center">
                {ratingError}
              </small>
            )}

            <div className="flex mt-4 justify-around">
              {submitting ? (
                <button className="btn btn-block bg-blue-500">
                  <span>
                    <TbFidgetSpinner
                      size={20}
                      className="text-white animate-spin"
                    />
                  </span>
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="btn btn-outline outline-blue-600 cursor-pointer inline-flex justify-center rounded-md px-7 py-2 text-lg font-medium text-blue-600 hover:bg-blue-600 hover:text-white"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSubmit(handleSubmitReviewRating)}
                    type="button"
                    className="btn cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-7 py-2 text-lg font-medium text-white hover:opacity-80"
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ReviewRatingModal;
