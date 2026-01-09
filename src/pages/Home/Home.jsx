import Banner from "./Banner";
import BrandMarquee from "./BrandMarquee";
import Coverage from "./Coverage";
import FAQ from "./FAQ";
import HowItWorks from "./HowItWorks";
import LatestBooks from "./LatestBooks";
import Testimonial from "./Testimonial";
import WhyChoose from "./WhyChoose";

const Home = () => {
  return (
    <>
      <Banner />
      <div className="max-w-7xl mx-auto p-3 lg:p-0">
        {/* latest books */}
        <LatestBooks />

        {/* How it works */}
        <HowItWorks />

        {/* coverage section */}
        <Coverage></Coverage>

        {/* animated section */}
        <BrandMarquee />

        {/* why choose us */}
        <section className="my-10 bg-gray-300 p-3">
          <WhyChoose />
        </section>

        {/* customer review */}
        <Testimonial />

        {/* FAQ section */}
        <FAQ />
      </div>
    </>
  );
};

export default Home;
