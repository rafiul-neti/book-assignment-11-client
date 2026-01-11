import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// Asset imports
import delivery from "../../assets/banner/delivery.jpeg";
import relax from "../../assets/banner/relax.jpg";
import research from "../../assets/banner/research.JPG";

import "swiper/css";
import "swiper/css/pagination";

const BannerSlider = () => {
  const slides = [
    {
      id: 1,
      image: delivery,
      title: "Books Delivered to Your Doorstep",
      description:
        "Order books from trusted libraries and receive them at home without visiting.",
      buttonText: "Browse All Books",
    },
    {
      id: 2,
      image: research,
      title: "Built for Students & Researchers",
      description: "Access academic and research books easily from anywhere.",
      buttonText: "Explore Books",
    },
    {
      id: 3,
      image: relax,
      title: "Search, Order & Relax at Home",
      description:
        "We manage book collection and delivery so you can focus on learning.",
      buttonText: "How It Works",
    },
  ];

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} w-5! h-5! text-sm bg-[#62ab00]! text-white! flex items-center justify-center font-bold rounded-full opacity-100">${
        index + 1
      }</span>`;
    },
  };

  return (
    <section className="w-full bg-base-100 overflow-hidden relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={pagination}
        loop={true}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="flex flex-col lg:flex-row items-center min-h-[65vh] lg:min-h-[80vh]">
              {/* Left Side: Content */}
              <div className="w-full lg:w-1/2 flex justify-center items-center p-8 lg:p-20 order-2 lg:order-1">
                <div className="max-w-xl text-center lg:text-left">
                  <h1 className="text-4xl lg:text-6xl font-extrabold text-base-content leading-tight">
                    {slide.title}
                  </h1>
                  <p className="py-8 text-lg lg:text-xl text-base-content/70 font-medium">
                    {slide.description}
                  </p>
                  <button className="btn bg-[#0b4a2a] btn-lg shadow-lg text-[#ffffff]">
                    {slide.buttonText}
                  </button>
                </div>
              </div>

              {/* Right Side: Image */}
              <div className="w-full lg:w-1/2 h-[40vh] lg:h-[80vh] order-1 lg:order-2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
