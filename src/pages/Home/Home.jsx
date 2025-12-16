import Banner from "./Banner";
import BrandMarquee from "./BrandMarquee";
import Coverage from "./Coverage";
import FAQ from "./FAQ";
import LatestBooks from "./LatestBooks";
import Testimonial from "./Testimonial";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto p-3 lg:p-0">
      <Banner />

      {/* latest books */}
      <LatestBooks />

      {/* coverage section */}
      <Coverage></Coverage>

      {/* animated section */}
      <BrandMarquee />

      {/* customer review */}
      <Testimonial />

      {/* FAQ section */}
      <FAQ />
    </div>
  );
};

export default Home;
