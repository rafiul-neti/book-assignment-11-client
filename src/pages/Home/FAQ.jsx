import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import ReusableFAQ from "../../components/Shared/FAQ/ReusableFAQ";

const FAQ = () => {
  const { data: faqData = [] } = useQuery({
    queryKey: ["FAQ"],
    queryFn: async () => {
      const res = await axios.get("/faq.json");
      return res.data;
    },
  });

  return (
    <div className="my-14">
      <ReusableFAQ
        faqs={faqData.slice(0, 5)}
        title={"Frequently Asked Question (FAQ)"}
        subtitle={`Got questions? We’ve got answers about borrowing books, requesting
        deliveries, and using BookCourier hassle-free.`}
        showButton={true}
      />
    </div>
  );
};

export default FAQ;
