import React from "react";
import { useState } from "react";
import AddDonation from "../../components/donations/AddDonation";
import ViewDonations from "../../components/donations/ViewDonation";

const DonorDashboardc = () => {
    const [showAdd, setShowAdd] = useState(true);
     return (
       <div className="min-h-screen flex items-center justify-center bg-white  px-4 sm:px-6 lg:px-8">
         <div className="max-w-5xl w-full mx-auto p-6 sm:p-10 bg-white  rounded-lg shadow-md ">
           <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-4">
             Welcome Donor!
           </h1>
           <p className="text-center text-gray-800 mb-6 font-medium text-lg sm:text-2xl">
             Here you can manage your donations.
           </p>

           {/* Button to toggle between Add/View Donations */}
           <div className="text-center mb-6">
             <button
               onClick={() => setShowAdd(!showAdd)}
               className="bg-[#4e7d73] text-white font-semibold  hover:bg-[#3f514d]  px-6 py-3 rounded-md shadow-md transition duration-300"
             >
               {showAdd ? "View Donations" : "Add Donation"}
             </button>
           </div>

           {/* Conditional Rendering for AddDonation / ViewDonations */}
           <div className="mt-4">
             {showAdd ? <AddDonation /> : <ViewDonations />}
           </div>
         </div>
       </div>
     );
};

export default DonorDashboardc;
