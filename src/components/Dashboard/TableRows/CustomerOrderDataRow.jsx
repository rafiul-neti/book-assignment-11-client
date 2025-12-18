import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router";

const CustomerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    bookImage,
    bookName,
    bookPrice,
    orderStatus,
    paymentStatus,
    orderedAt,
    trackingId,
  } = order;

  const handleCancelOrder = (id) => {
    const cancelOrder = { status: "cancelled" };

    Swal.fire({
      title: "Do you want to cancel the order?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/orders/${id}`, cancelOrder);

          if (res.data.modifiedCount) {
            toast.success(`Your order has been cancelled!`);
            refetch();
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  const handlePayment = async (orderInfo) => {
    const bookInfo = {
      bookId: orderInfo.bookId,
      bookPrice: Number(bookPrice),
      bookName,
      trackingId: orderInfo.trackingId,
      customerEmail: orderInfo.customerEmail,
    };

    // console.log(bookInfo);

    try {
      const res = await axiosSecure.post(`/payment-checkout-session`, bookInfo);
      const { url } = res.data;
      window.location.assign(url);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const roleStyles = {
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    shipped: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    delivered:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="shrink-0">
            <div className="block relative">
              <img
                alt="profile"
                src={bookImage}
                className="mx-auto object-cover rounded h-10 w-15 "
              />
            </div>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">{bookName}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">TK.{bookPrice}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900">
          {new Date(orderedAt).toLocaleDateString()}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${roleStyles[orderStatus]} capitalize rounded-full px-3 py-1 text-sm font-medium`}
        >
          {orderStatus}
        </p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {orderStatus === "cancelled" ? (
          "--"
        ) : (
          <>
            {orderStatus === "pending" && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="btn btn-sm relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight"
              >
                <span className="absolute cursor-pointer inset-0 bg-red-200 opacity-50"></span>
                <span className="relative cursor-pointer">Cancel</span>
              </button>
            )}

            <>
              {paymentStatus === "paid" ? (
                <Link
                  to={`/track-parcel/${trackingId}`}
                  className="btn btn-sm bg-[#61ab00cc] text-white"
                >
                  Track Parcel
                </Link>
              ) : (
                <button
                  onClick={() => handlePayment(order)}
                  className="mx-1.5 btn btn-sm text-white bg-[#62ab00] disabled:bg-gray-500 disabled:text-black disabled:cursor-none"
                >
                  Pay
                </button>
              )}
            </>
          </>
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
