import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CustomerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const {
    bookImage,
    bookName,
    bookPrice,
    orderStatus,
    paymentStatus,
    orderedAt,
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
          className={`${
            orderStatus === "cancelled"
              ? "text-red-600"
              : orderStatus === "shipped"
              ? "text-[#7ED321]"
              : orderStatus === "delivered"
              ? "text-green-700"
              : "text-gray-900"
          } capitalize font-bold`}
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

            <button
              disabled={paymentStatus === "paid" ? true : false}
              className="mx-1.5 btn btn-sm text-white bg-[#62ab00] disabled:bg-gray-500 disabled:text-black disabled:cursor-none"
            >
              Pay
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default CustomerOrderDataRow;
