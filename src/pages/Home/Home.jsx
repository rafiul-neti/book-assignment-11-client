import Banner from "./Banner";
import BrandMarquee from "./BrandMarquee";
import FAQ from "./FAQ";
import HowItWorks from "./HowItWorks";
import LatestBooks from "./LatestBooks";
import LibraryOwnerSection from "./LibraryOwnerSection";
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
        <section id="how-it-works">
          <HowItWorks />
        </section>

        {/* animated section */}
        <BrandMarquee />

        {/* why choose us */}
        <section className="my-10 bg-gray-300 p-3">
          <WhyChoose />
        </section>

        {/* customer review */}
        <Testimonial />

        {/* Library Owner's */}
        <LibraryOwnerSection />

        {/* FAQ section */}
        <FAQ />
      </div>
    </>
  );
};

export default Home;
