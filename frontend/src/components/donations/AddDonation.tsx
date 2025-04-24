import React, { useState } from 'react';
import { addDonation } from '../../graphql/donation';

const AddDonation = () => {
  const [foodType, setFoodType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [expiryDate, setExpiryDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error("User not authenticated");
    //   alert("Please log in to add a donation.");
    //   return;
    // }

    const donationData = {
      foodType,
      quantity,
      expiryDate,
      location,
      description,
    };
    try {
      const response = await addDonation(donationData);
      console.log("Donation added successfully:", response);
      alert("Donation added successfully!");
    } catch (error) {
      console.error("Error adding donation:", error);
      alert("Failed to add donation. Please try again.");
    }
  };


  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg shadow-md max-w-lg mx-auto bg-white"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Add a Donation</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Food Type */}
        <div className="flex flex-col">
          <label
            htmlFor="foodType"
            className="text-sm font-semibold text-gray-900 mb-1"
          >
            Food Type
          </label>
          <input
            type="text"
            id="foodType"
            name="foodType"
            placeholder="Enter food type"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="text-sm font-semibold text-gray-900 mb-1"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Quantity */}
        <div className="flex flex-col">
          <label
            htmlFor="quantity"
            className="text-sm font-semibold text-gray-900 mb-1"
          >
            Quantity
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
            min="1"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Expiry Date */}
        <div className="flex flex-col">
          <label
            htmlFor="expiryDate"
            className="text-sm font-semibold text-gray-900 mb-1"
          >
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-gray-900 mb-1"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Add description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 bg-[#4e7d73] text-white font-semibold py-2 hover:bg-[#3f514d] transition duration-300 rounded-lg"
      >
        Submit
      </button>
    </form>
  );
};

export default AddDonation;
