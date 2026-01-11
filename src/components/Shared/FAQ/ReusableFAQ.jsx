import React from "react";

const ReusableFAQ = ({
  title,
  subtitle,
  faqs,
  columns = 1,
  showButton = false,
}) => {
  return (
    <section className="my-14 w-11/12 mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center">
        {title}
      </h1>

      {subtitle && (
        <p className="my-5 text-[#333333] text-center max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}

      <div
        className={`grid gap-4 ${
          columns === 2 ? "md:grid-cols-2" : "grid-cols-1"
        }`}
      >
        {faqs.map((item, index) => (
          <div
            key={index}
            className="collapse collapse-arrow bg-white border border-base-300"
          >
            <input type="checkbox" />
            <div className="collapse-title font-semibold text-[#0b4a2a]">
              {item.query}
            </div>
            <div className="collapse-content text-sm text-[#333333]">
              {item.ans}
            </div>
          </div>
        ))}
      </div>

      {showButton && (
        <div className="my-8 flex justify-center">
          <button className="btn bg-[#62ab00] btn-wide border-2 border-[#62ab00] text-white text-lg font-semibold rounded-2xl">
            See More FAQ's
          </button>
        </div>
      )}
    </section>
  );
};

export default ReusableFAQ;
