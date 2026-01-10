import React from "react";
import safeDelivery from "../../assets/safe-delivery.png";
import liveTracking from "../../assets/live-tracking.png";

const WhyChoose = () => {
  const benefits = [
    {
      image: liveTracking,
      title: "Live Parcel Tracking",
      description:
        "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
    },
    {
      image: safeDelivery,
      title: "100% Safe Delivery",
      description: `We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.`,
    },
    {
      image: safeDelivery,
      title: "24/7 Call Center Support",
      description: `Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.`,
    },
  ];

  return (
    <>
      <div className="bg-white p-2 rounded-xl">
        <h1 className="text-center text-2xl md:text-3xl lg:text-5xl font-bold">
          Why Choose Us
        </h1>
        <p className="mt-5 text-center">
          Every decision we make is guided by one goal: providing you with the
          best possible experience before, during, and after your purchase.
        </p>
      </div>

      <div className="mt-8 hidden lg:bolck mb-14 border border-[#62ab00] border-dashed h-0.5"></div>
      <div className="mt-10 space-y-5">
        {benefits.map((benefit, ind) => (
          <div key={ind} className="benefits-cards">
            <img src={benefit.image} alt="" />

            <div className="border border-[#62ab00] border-dashed self-stretch"></div>

            <div className="">
              <h1 className="benefits-h1">{benefit.title}</h1>
              <p className="benefits-p">{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden lg:bolck mt-14 border border-[#bd0018] border-dashed h-0.5"></div>
    </>
  );
};

export default WhyChoose;
