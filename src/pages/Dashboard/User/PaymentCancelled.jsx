import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10 items-center justify-center">
      <h1 className="text-4xl text-red-500 font-bold">Payment Cancelled</h1>
      <div className="flex items-center gap-10">
        <Link
          className="btn btn-md bg-[#62ab00] text-white"
          to={`/dashboard/my-orders`}
        >
          My Orders
        </Link>
        <Link className="btn btn-md bg-[#62ab00] text-white" to={`/dashboard`}>
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
