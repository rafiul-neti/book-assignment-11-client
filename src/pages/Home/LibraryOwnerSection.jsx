import React from "react";
import libraryIllustration from "../../assets/illustrations/library-partner.svg";
import { Link } from "react-router";

const LibraryOwnerSection = () => {
  return (
    <section className="my-18 w-11/12 mx-auto bg-gradient-to-r from-[#062f1a] to-[#0b4a2a] rounded-3xl p-3 md:p-5 flex flex-col-reverse lg:flex-row items-center gap-12">
      <div className="text-white max-w-xl text-center lg:text-left">
        <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
          Partner with BookCourier & Grow Your Library
        </h2>

        <p className="mt-4 text-white/80 text-base lg:text-lg">
          List your books online, receive orders from students and researchers,
          and let us handle delivery while you focus on managing your library.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <button className="px-6 py-3 rounded-lg bg-[#62ab00] text-black font-semibold hover:bg-[#62ab00]/90 transition">
            Become a Library Partner
          </button>

          <Link
            to="#how-it-works"
            className="
                px-6 py-3
                rounded-lg
                border border-white/60
                text-white
                hover:bg-white/10
                transition
              "
          >
            Learn How It Works
          </Link>
        </div>
      </div>

      {/* ILLUSTRATION */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img
          src={libraryIllustration}
          alt="Library partnership illustration"
          className="
              w-full
              max-w-sm
              md:max-w-md
              lg:max-w-lg
            "
          loading="lazy"
        />
      </div>
    </section>
  );
};

export default LibraryOwnerSection;
