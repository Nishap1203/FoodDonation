import { useState } from "react";
import AddDonation from "../components/donations/AddDonation";
import ViewDonations from "../components/donations/ViewDonation";

const Donations = () => {
  const [showAdd, setShowAdd] = useState(true);

  return (
    <div>
      <button
        onClick={() => setShowAdd(!showAdd)}
        className="bg-gray-500 text-white px-4 py-2 rounded"
      >
        {showAdd ? "View Donations" : "Add Donation"}
      </button>

      {showAdd ? <AddDonation /> : <ViewDonations />}
    </div>
  );
};

export default Donations;
