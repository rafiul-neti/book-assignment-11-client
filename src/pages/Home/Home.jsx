import Banner from "./Banner";
import BrandMarquee from "./BrandMarquee";
import Coverage from "./Coverage";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <Banner />

      {/* latest books */}

      {/* coverage section */}
      <Coverage></Coverage>

      {/* animated section */}
      <BrandMarquee />

      {/* customer review */}
      <Testimonial />
    </div>
  );
};

export default Home;
