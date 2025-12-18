import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { Link } from "react-router";

const Invoices = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", "user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?user=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div>
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center text-[#62ab00]">
        My Completed Payments ({payments.length})
      </h1>

      <div className="my-7 overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th className="text-center">Book Name</th>
              <th className="text-center">Book Price</th>
              <th className="text-center">Transaction ID</th>
              <th className="text-center">Tracking ID</th>
              <th className="text-center">Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, ind) => (
              <tr key={payment._id}>
                <th className="text-center">{ind + 1}</th>
                <td>{payment.bookName}</td>
                <td>TK.{payment.amount}</td>
                <td>{payment.transactionId}</td>
                <td className="hover:text-blue-600">
                  <Link to={`/track-parcel/${payment.trackingId}`}>
                    {payment.trackingId}
                  </Link>
                </td>
                <td>{new Date(payment.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoices;
