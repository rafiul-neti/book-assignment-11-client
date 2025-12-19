import { useState } from "react";
import CustomerOrderDataRow from "../../../components/Dashboard/TableRows/CustomerOrderDataRow";
import ReviewRatingModal from "../../../components/Modal/ReviewRatingModal";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const MyOrders = () => {
  const [rating, setRating] = useState(0);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [bookToReview, setBookToReview] = useState({});
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["my-orders", user?.email, "customerEmail"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?customerEmail=${user.email}`);
      return res.data;
    },
  });

  const closeReviewModal = () => {
    setIsReviewOpen(false);
    setRating(0);
  };

  return (
    <>
      <div className="">
        <h1 className="text-2xl md:text-3xl lg:text-5xl text-[#62ab00] font-bold text-center">
          My Orders: ({orders.length})
        </h1>
      </div>

      {orders.length === 0 ? (
        <div className="min-h-screen flex items-center justify-center">
          <span className="text-xl md:text-2xl lg:text-6xl font-bold text-gray-600">
            You haven't ordered any book yet.
          </span>
        </div>
      ) : (
        <div className="container px-2 mx-auto sm:px-8">
          <div className="py-3">
            <div className="-mx-4 sm:-mx-8 px-1.5 sm:px-8 py-0.5 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-1.5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                      >
                        Book Info.
                      </th>

                      <th
                        scope="col"
                        className="px-1.5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                      >
                        Order Date
                      </th>
                      <th
                        scope="col"
                        className="px-1.5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                      >
                        Track Order
                      </th>
                      <th
                        scope="col"
                        className="px-1.5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                      >
                        Status
                      </th>

                      <th
                        scope="col"
                        className="px-1.5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                      >
                        Action
                      </th>
                      <th
                        scope="col"
                        className="px-1.5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-bold"
                      >
                        Rating & Review
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <CustomerOrderDataRow
                        key={order._id}
                        order={order}
                        refetch={refetch}
                        setBookToReview={setBookToReview}
                        setIsReviewOpen={setIsReviewOpen}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      <ReviewRatingModal
        isOpen={isReviewOpen}
        closeModal={closeReviewModal}
        book={bookToReview}
        rating={rating}
        setRating={setRating}
      />
    </>
  );
};

export default MyOrders;
