import React from "react";
import ReusableFAQ from "../../components/Shared/FAQ/ReusableFAQ";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const Faq = () => {
  const { data: faqData = [] } = useQuery({
    queryKey: ["FAQ"],
    queryFn: async () => {
      const res = await axios.get("/faq.json");
      return res.data;
    },
  });

  return (
    <div className="w-11/12 mx-auto p-2 lg:p-0">
      <div className="mt-3 mb-10 text-gray-700 text-lg font-bold flex items-center gap-1.5">
        <Link to={`/`}>Home</Link>
        <span>{">"}</span>
        <p className="text-[#62ab00] cursor-pointer">FAQ's</p>
      </div>
      <ReusableFAQ
        title="Frequently Asked Questions"
        subtitle="Find detailed answers about BookCourier services, deliveries, returns, libraries, and platform usage."
        faqs={faqData.slice(5)}
        columns={2}
      />
    </div>
  );
};

export default Faq;
