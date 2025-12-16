import Container from "../../components/Shared/Container";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useState } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import { IoMdHeartEmpty } from "react-icons/io";

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: bookAndSeller = {}, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}/details`);
      return res.data;
    },
  });

  let [isOpen, setIsOpen] = useState(false);

  if (isLoading) return <LoadingSpinner />;

  const { result: book, whoIsLibrarian } = bookAndSeller || {};
  console.log(book, whoIsLibrarian);

  const closeModal = () => {
    setIsOpen(false);
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
            <button className="btn btn-outline text-base">
              <IoMdHeartEmpty size={20} /> Add to WishList
            </button>
            <div>
              <Button onClick={() => setIsOpen(true)} label="Order Now" />
            </div>
          </div>
          <hr className="my-6" />

          <PurchaseModal closeModal={closeModal} isOpen={isOpen} book={book} />
        </div>
      </div>
    </Container>
  );
};

export default BookDetails;
