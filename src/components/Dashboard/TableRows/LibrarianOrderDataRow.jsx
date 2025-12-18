import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";

const SellerOrderDataRow = ({ order, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [statusUpdating, setStatusUpdating] = useState(false);

  const {
    bookImage,
    bookName,
    bookPrice,
    orderStatus,
    paymentStatus,
    customerEmail,
    customerAddress,
  } = order;

  const handleUpdateOrderStatus = async (id, status) => {
    if (status === "cancelled") {
      const cancelOrder = { status };

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
              toast.success(`You've successfully cancelled the order!`);
              refetch();
            }
          } catch (error) {
            toast.error(error.message);
          }
        }
      });
    } else {
      const updateStatus = { status };
      setStatusUpdating(true);
      try {
        const res = await axiosSecure.patch(`/orders/${id}`, updateStatus);

        if (res.data.modifiedCount) {
          toast.success(`You've successfully updated the status to ${status}!`);
          refetch();
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setStatusUpdating(false);
      }
    }
  };

  const handleRefund = () => {
    toast.error(`We haven't added any functionality here!`);
  };

  return (
    <tr>
      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-14 w-14">
              <img src={bookImage} alt="Book Image" />
            </div>
          </div>
          <div>
            <div className="font-bold text-left">{bookName}</div>
            <div className="text-sm text-left">TK.{bookPrice}</div>
          </div>
        </div>
      </td>
      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
        <div className="">
          <div className="">{customerEmail}</div>
          <div className="">{customerAddress}</div>
        </div>
      </td>

      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
        <p
          className={`${
            paymentStatus === "unpaid" ? "text-red-600" : "text-green-700"
          } capitalize font-semibold`}
        >
          {paymentStatus}
        </p>
      </td>

      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
        {orderStatus === "cancelled" ? (
          <span className="text-red-600 font-semibold">Order Cancelled</span>
        ) : orderStatus === "delivered" ? (
          <span className="text-green-700 font-bold">Parcel Delivered</span>
        ) : (
          <select
            defaultValue={orderStatus}
            disabled={statusUpdating}
            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
            className="select border-2 border-lime-300 focus:outline-[#62ab00] rounded-md text-gray-900  bg-white"
          >
            <option
              disabled={
                ["shipped", "delivered"].includes(orderStatus) ? true : false
              }
              value="pending"
            >
              Pending
            </option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        )}
      </td>

      <td className="px-5 py-3 border-b border-gray-200 bg-white text-sm">
        {["shipped", "delivered"].includes(orderStatus) ? (
          <span>--</span>
        ) : paymentStatus === "paid" ? (
          <button
            onClick={handleRefund}
            className="btn btn-sm bg-amber-100 text-[#bd0018]"
          >
            Refund
          </button>
        ) : (
          <button
            onClick={() => handleUpdateOrderStatus(order._id, "cancelled")}
            disabled={
              ["cancelled", "shipped", "delivered"].includes(orderStatus)
                ? true
                : false
            }
            className="btn btn-sm disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black cursor-pointer inline-block px-3 py-1 font-semibold bg-red-200 text-red-900 leading-tight"
          >
            Cancel Order
          </button>
        )}
      </td>
    </tr>
  );
};

export default SellerOrderDataRow;
