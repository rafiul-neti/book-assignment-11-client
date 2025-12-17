import React from "react";

const WishListDataRow = ({
  book,
  setIsOpen,
  setSelectedBook,
  handleDeletefromWishlist,
  setRun,
}) => {
  const handleOrderFromWishList = (bookSelected) => {
    setIsOpen(true);
    setSelectedBook(bookSelected);
    setRun(true)
  };

  // console.log("id after receiving data from wishlist", book._id, book.bookId)

  return (
    <>
      <tr>
        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={book.bookImage} alt="Book Image" />
              </div>
            </div>
            <div>
              <div className="font-bold">{book.bookName}</div>
              <div className="text-sm text-left">
                <span className="text-xl font-bold">৳</span>
                {book.bookPrice}
              </div>
            </div>
          </div>
        </td>
        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 text-left">{book.bookAuthor}</p>
        </td>

        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
          <p
            className={`${
              book.bookStatus === "Published"
                ? "text-green-800 bg-green-200"
                : "text-red-700 bg-red-200"
            } text-center font-medium px-2 py-1 rounded-lg`}
          >
            {book.bookStatus === "Published" ? "In Stock" : "Out of Stock"}
          </p>
        </td>

        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 text-center">
            {book.bookStatus === "Published" ? `${book.bookQuantity}` : 0}
          </p>
        </td>

        <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm text-center">
          <button
            onClick={() => handleOrderFromWishList(book)}
            className="btn btn-sm bg-[#62ab00] text-white text-nowrap"
          >
            Order Now
          </button>

          <button
            onClick={() => handleDeletefromWishlist(book.bookId)}
            className="mx-2 btn btn-sm"
          >
            Remove
          </button>
        </td>
      </tr>
    </>
  );
};

export default WishListDataRow;
