import React from "react";
import Marquee from "react-fast-marquee";
import Brand1 from "../../assets/brands/amazon.png";
import Brand2 from "../../assets/brands/amazon_vector.png";
import Brand3 from "../../assets/brands/casio.png";
import Brand4 from "../../assets/brands/moonstar.png";
import Brand5 from "../../assets/brands/randstad.png";
import Brand6 from "../../assets/brands/star.png";
import Brand7 from "../../assets/brands/start_people.png";

const brands = [Brand1, Brand2, Brand3, Brand4, Brand5, Brand6, Brand7];

const BrandMarquee = () => {
  return (
    <div className="">
      <Marquee>
        <div className="flex items-center gap-10">
          {brands.map((brand, ind) => (
            <div key={ind}>
              <img src={brand} alt="" />
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
};

export default BrandMarquee;
