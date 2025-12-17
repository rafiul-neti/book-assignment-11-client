import React, { useState } from "react";
import WishListDataRow from "../../../components/Dashboard/TableRows/WishListDataRow";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import PurchaseModal from "../../../components/Modal/PurchaseModal";
import toast from "react-hot-toast";

const MyWishlist = () => {
  const [selectedBook, setSelectedBook] = useState({});
  const [run, setRun] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: wishlistsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlist", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlists?email=${user.email}`);
      return res.data;
    },
  });

  const handleDeletefromWishlist = async (id) => {
    console.log("id from handleDeleteApi Function", id);
    try {
      const res = await axiosSecure.delete(
        `/wishlists/${id}?userEmail=${user.email}`
      );
      if (res.data.deletedCount) {
        toast.success("Book removed from wishlist.");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  let [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-[#62ab00]">
          My wishlist has {wishlistsData.length} books
        </h1>
      </div>

      {wishlistsData.length === 0 ? (
        <div className="min-h-screen flex justify-center items-center">
          <h1 className="text-gray-400 text-2xl md:text-3xl lg:text-4xl font-bold">
            You've no books in your wishlist.
          </h1>
        </div>
      ) : (
        <div className="container mx-auto sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800 text-center text-sm capitilize font-bold"
                      >
                        Book Info
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Author
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Quantity
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm capitilize font-bold"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {wishlistsData.map((book) => (
                      <WishListDataRow
                        key={book._id}
                        book={book}
                        refetch={refetch}
                        setIsOpen={setIsOpen}
                        setSelectedBook={setSelectedBook}
                        handleDeletefromWishlist={handleDeletefromWishlist}
                        setRun={setRun}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      <PurchaseModal
        isOpen={isOpen}
        closeModal={closeModal}
        book={selectedBook}
        handleDeletefromWishlist={handleDeletefromWishlist}
        refetch={refetch}
        setRun={setRun}
        run={run}
      />
    </>
  );
};

export default MyWishlist;
