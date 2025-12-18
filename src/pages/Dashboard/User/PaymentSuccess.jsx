import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const PaymentSuccess = () => {
  const [searchparams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchparams.get("session_id");
  //   console.log(sessionId)
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    try {
      if (sessionId) {
        axiosSecure
          .patch(`/payment-success?session_id=${sessionId}`)
          .then((res) => {
            const info = {
              trackingId: res.data.trackingId,
              transactionId: res.data.transactionId,
            };

            setPaymentInfo(info);
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axiosSecure, sessionId]);

  return (
    <div>
      <h1 className="my-3 text-4xl font-bold text-green-500">Payment Successful</h1>
      <div className="my-2">
        <p>
          Your book tracking ID:{"  "}
          <span className="font-bold">{paymentInfo.trackingId}</span>
        </p>
        <p>
          Your transaction ID:{"  "}
          <span className="font-bold">{paymentInfo.transactionId}</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
