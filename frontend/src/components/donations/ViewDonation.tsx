import { useEffect, useState } from "react";
import { getDonations } from "../../graphql/donation"; // Import the function

interface Donation {
  id: string;
  foodType: string;
  description: string;
  quantity: number;
  location: string;
  expiryDate: string;
  status: string;
  donor: {
    id: string;
    name: string;
  };
}

const ViewDonations = () => {
  const [loading, setLoading] = useState(true);
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await getDonations();
        // setDonations(response.data.getMyDonations || []); // Access Donations array
        if (response && response.data.getMyDonations) {
          setDonations(response.data.getMyDonations.Donations || []);
        } else {
          console.error("Received null response from getDonations");
        }

      } catch (error) {
        console.error("Failed to fetch donations:", error);
      } finally {
        setLoading(false);
      }
    };

     fetchDonations();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Your Donations</h2>

      {loading ? (
        <p className="text-center text-gray-600">Loading donations...</p>
      ) : donations.length === 0 ? (
        <p className="text-center text-gray-500">No donations found.</p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {donations.map((donation) => (
            <li
              key={donation.id}
              className="p-4 border rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition duration-300"
            >
              <p className="text-lg font-medium">{donation.foodType}</p>
              <p className="text-gray-700">
                <span className="font-semibold">Description:</span>{" "}
                {donation.description}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Quantity:</span>{" "}
                {donation.quantity}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Expiry Date:</span>{" "}
                {donation.expiryDate}
              </p>
              <p className="text-gray-700">
                <span className="font-semibold">Status:</span> {donation.status}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ViewDonations;
