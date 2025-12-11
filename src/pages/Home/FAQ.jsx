import React from "react";

const FAQ = () => {
  const faqQueriesAndAnswers = [
    {
      query: "How does BookCourier work?",
      ans: "BookCourier connects you with nearby libraries. You can request a book for pickup or delivery directly through the website. Once your request is confirmed, a courier collects the book from the library and delivers it to your doorstep. Returning books is just as simple — schedule a pickup through your account.",
    },
    {
      query: "Who can use BookCourier?",
      ans: "BookCourier is designed for students, researchers, and book lovers. Anyone who needs to borrow or return books from participating libraries can use the service. All you need is an account and a library membership where applicable.",
    },
    {
      query: "Can I request multiple books at the same time?",
      ans: "Yes! You can request multiple books in a single order, depending on the library’s borrowing rules. The system will show you the available books and allow you to select all the ones you want before confirming your request.",
    },
    {
      query: "How long does delivery take?",
      ans: "Delivery times vary based on your location and the library’s schedule. Typically, books are delivered within 1–3 business days. You can track your request in your BookCourier account to see the delivery status.",
    },
    {
      query: "Are there any fees for using BookCourier?",
      ans: "BookCourier may charge a small delivery fee depending on the library and distance. The system will display the total cost before you confirm your request, so there are no surprises. Some libraries may also offer free delivery for certain users or promotions.",
    },
  ];

  return (
    <div className="my-14">
      <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold text-[#62ab00] text-center">
        Frequently Asked Question (FAQ)
      </h1>
      <p className="my-5 text-[#333333] text-center">
        Got questions? We’ve got answers about borrowing books, requesting
        deliveries, and using BookCourier hassle-free.
      </p>

      {faqQueriesAndAnswers.map((queAns, ind) => (
        <div
          key={ind}
          className="mb-2 collapse collapse-arrow bg-white border-base-300 border"
        >
          <input type="checkbox" className="clicked" />
          <div className="collapse-title font-semibold text-[#bd0018]">
            {queAns.query}
          </div>

          <div className="collapse-content text-sm text-[#333333]">
            {queAns.ans}
          </div>
        </div>
      ))}

      <div className="my-5 flex items-center justify-center">
        <button className="btn bg-[#62ab00] btn-wide border-2 border-[#62ab00] text-white text-lg font-semibold rounded-2xl">
          See More FAQ's
        </button>
      </div>
    </div>
  );
};

export default FAQ;
