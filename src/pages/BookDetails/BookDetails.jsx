import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { IoMdHeartEmpty } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import ReviewRatingModal from "../../components/Modal/ReviewRatingModal";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [adding, setAdding] = useState(false);
  const [rating, setRating] = useState(0);

  const { data: bookAndSeller = {}, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}/details`);
      return res.data;
    },
  });

  let [isOpen, setIsOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  const { result: book, whoIsLibrarian } = bookAndSeller || {};
  // console.log(book, whoIsLibrarian);

  const closeModal = () => {
    setIsOpen(false);
  };

  const closeReviewModal = () => {
    setIsReviewOpen(false);
    setRating(0);
  };

  console.log("bookid before addToWish", book._id);

  const handleAddtoWishlist = async (bookInfo) => {
    const favBook = { ...bookInfo, wishlister: user?.email };

    // console.log("id after receivInfo in addWishFunc", bookInfo._id)
    // console.log(favBook)

    try {
      setAdding(true);

      const res = await axiosSecure.post("/wishlist", favBook);
      // console.log(res)
      if (res.data.insertedId) {
        toast.success("Book successfully added to wishlist.");
      } else if (res.data.message) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Container>
      <div className="mx-auto bg-gray-50 p-3 dark:bg-slate-950 flex flex-col lg:flex-row justify-between lg:items-center w-full gap-12">
        {/* Header */}
        <div className="flex flex-col gap-6 flex-1">
          <div>
            <div className="w-full overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={book.bookImage}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className="md:gap-10 flex-1 p-2">
          {/* Plant Info */}
          <div className="">
            <div className="text-2xl font-bold text-gray-900 dark:text-slate-100">
              {book.bookName}
            </div>
            <div className="mt-2 text-gray-500 dark:text-slate-400">
              Author: {book.bookAuthor}
            </div>
          </div>
          <hr className="my-6" />
          <div
            className="
          text-lg font-normal text-gray-700 dark:text-slate-300"
          >
            {book.bookDescription}
          </div>
          <hr className="my-6" />

          <div
            className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              "
          >
            <div>Seller: {whoIsLibrarian.displayName}</div>

            <img
              className="rounded-full"
              height="auto"
              width="30"
              alt="Avatar"
              referrerPolicy="no-referrer"
              src={whoIsLibrarian.photoURL}
            />
          </div>
          <hr className="my-6" />
          <div className="flex justify-between items-center">
            <p className="font-bold text-3xl">
              <span className="text-gray-900 dark:text-[#7ED321]">
                TK.{book.bookPrice}
              </span>
            </p>
            <p
              className={`gap-4 font-bold ${
                book.bookQuantity > 0
                  ? "text-[#62ab00] dark:text-[#7ED321]"
                  : "text-red-600"
              }`}
            >
              {book.bookQuantity > 0
                ? `Quantity: ${book.bookQuantity} Pcs. Left Only!`
                : "Stock Out"}
            </p>
          </div>
          <hr className="my-6" />
          <div className="flex justify-between items-center">
            <button
              onClick={() => handleAddtoWishlist(book)}
              className="btn btn-outline text-base"
            >
              {adding ? (
                <span className="flex justify-center items-center">
                  <TbFidgetSpinner className="animate-spin" />
                </span>
              ) : (
                <>
                  <IoMdHeartEmpty size={20} /> Add to WishList
                </>
              )}
            </button>
            <div>
              <Button onClick={() => setIsOpen(true)} label="Order Now" />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} book={book} />
        </div>
      </div>

      {/* review and rating section */}
      <div className="my-10">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl text-[#333333] font-semibold">
            Reviews and Ratings
          </h1>
          {!user && (
            <div className="flex items-center gap-7">
              <h3 className="text-xl font-medium">
                Please login to write review
              </h3>
              <Link
                to={`/login`}
                className="btn btn-outline text-[#bd0018] outline-[#bd0018] text-base font-medium"
              >
                Login
              </Link>
            </div>
          )}
        </div>

        <div className="my-9 flex justify-between items-center">
          {user && (
            <div className="">
              <select
                onChange={(e) => setRating(e.target.value)}
                defaultValue={rating}
                className="select border-2 border-lime-300 focus:outline-[#62ab00]"
              >
                <option disabled value={0}>
                  Select Your Rating
                </option>
                <option value="1">1 Star - Very Bad</option>
                <option value="2">2 Star - Bad</option>
                <option value="3">3 Star - Good</option>
                <option value="4">4 Star - Very Good</option>
                <option value="5">5 Star - Good & Recommended</option>
              </select>

              <button
                onClick={() => setIsReviewOpen(true)}
                className="my-3 btn btn-outline outline-blue-500 text-blue-700 hover:bg-blue-500 hover:text-white"
              >
                Write a Review
              </button>
            </div>
          )}

          <div className="space-y-1.5">
            <h1>Avg Rating</h1>
            <p>Avg rating star</p>
          </div>
        </div>

        <div className="">
          <div className="">
            <div className="">
              <img src="" alt="" />
            </div>
            <div className="">
              <p>By Name Date</p>
              <p>Rating stars</p>
            </div>
          </div>

          <div className="">
            <p>review text</p>
          </div>
        </div>
      </div>

      <>
        <ReviewRatingModal
          book={book}
          isOpen={isReviewOpen}
          closeModal={closeReviewModal}
          rating={rating}
          setRating={setRating}
        />
      </>
    </Container>
  );
};

export default BookDetails;
