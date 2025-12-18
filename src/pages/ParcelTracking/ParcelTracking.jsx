import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";

const ParcelTracking = () => {
  const { trackingId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: trackings = [], isLoading } = useQuery({
    queryKey: ["trackings", trackingId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/trackings/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="p-3">
      <h1 className="text-3xl">Track Your Parcel: {trackingId}</h1>

      <ul className="my-10 timeline timeline-vertical">
        {trackings.map((tracking) => (
          <li key={tracking._id}>
            <div className="timeline-start text-lg">
              {new Date(tracking.createdAt).toLocaleString()}
            </div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end timeline-box capitalize text-lg">
              {tracking.message}
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ParcelTracking;
