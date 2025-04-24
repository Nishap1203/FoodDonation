
import React from "react";
import { Link } from "react-router-dom";
import SwiperComponent from "../components/common/SwiperComponent"; 

const Home: React.FC = () => {
  return (
    <div className="min-h-screen container mx-auto px-4 py-10 items-center text-center">
      <div className="flex flex-col md:flex-row items-center justify-center text-center gap-4">
        
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0 items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-[#578384] mb-6 justify-center content-center text-center items-center">
            Be The Reason
            <br />
            Someone Smiles Today!
          </h1>
          <p className="text-2xl font-bold text-cyan-900 mb-8 max-w-2xl mx-auto md:mx-0 text-center">
            Give a Little, Help a Lot!!
          </p>
          <div className="text-center">
          <Link
            to="/signup"
            className="bg-[#168c74] text-white px-8 py-3 rounded-lg shadow-md hover:bg-[#3f514d] transition inline-block text-center font-semibold"
          >
            Donate Now
          </Link>
          </div>
        </div>

        
        <div className="md:w-1/2">
          <SwiperComponent />
        </div>
      </div>
    </div>
  );
};

export default Home;
