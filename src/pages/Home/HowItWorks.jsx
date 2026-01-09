import { FaSearch, FaShoppingCart, FaTruck, FaBookOpen } from "react-icons/fa";

const HowItWorks = () => {
  const steps = [
    {
      icon: <FaSearch className="text-4xl text-[#62ab00]" />,
      title: "Search Books",
      desc: "Find books you need from the library database",
    },
    {
      icon: <FaShoppingCart className="text-4xl text-[#62ab00]" />,
      title: "Place Order",
      desc: "Order the books online in a few clicks",
    },
    {
      icon: <FaTruck className="text-4xl text-[#62ab00]" />,
      title: "Delivery",
      desc: "Books are delivered to your home",
    },
    {
      icon: <FaBookOpen className="text-4xl text-[#62ab00]" />,
      title: "Enjoy Reading",
      desc: "Start reading your books stress-free",
    },
  ];

  return (
    <section className="py-16 bg-gray-50 mt-3 rounded">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
          How It Works
        </h2>

        <div className="flex flex-col  md:flex-row justify-between items-start gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col bg-white p-3 lg:p-5 items-center text-center md:w-1/4 rounded-md"
            >
              {step.icon}
              <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
