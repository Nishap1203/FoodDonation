import { gql } from "@apollo/client";
import client from "../apollo/client";


// Define GraphQL mutations and queries
const ADD_DONATION_MUTATION = gql`
 mutation CreateDonation($foodType: String!, $description: String!, $expiryDate: String!, $location: String!, $quantity: Int!) {
  createDonation(foodType: $foodType, description: $description, expiryDate: $expiryDate, location: $location, quantity: $quantity) {
    Donation {
      id
      foodType
      quantity
      expiryDate
      location
      description
      status
    }
    message
  }
}

`;

export const GET_MY_DONATIONS = gql`
  query GetMyDonations {
    getMyDonations {
      Donations {
        id
        foodType
        description
        quantity
        location
        expiryDate
        status
      }
      message
    }
  }
`;

const GET_NEARBY_NGOS_QUERY = gql`
  query GetNearbyNgos($lat: Float!, $lng: Float!, $radius: Float!) {
    nearbyNgos(lat: $lat, lng: $lng, radius: $radius) {
      id
      name
      address
    }
  }
`;

// API functions
export const addDonation = async (donationData: {
  foodType: string;
  quantity: number;
  expiryDate: string;
  location: string;
  description: string;
}) => {
  const response = await client.mutate({
    mutation: ADD_DONATION_MUTATION,
    variables: donationData,
  });
  console.log("Response from addDonation:", response);
  return response.data.createDonation;
};

// export const getDonations = async () => {
//   const response = await client.query({
//     query: GET_MY_DONATIONS,
//   });
//   console.log(response)
//   return response.data.getMyDonations;
// };

export const getDonations = async () => {
  try {
    // console.log(document.cookie)
    const response = await client.query({
      query: GET_MY_DONATIONS,
      fetchPolicy: "no-cache", // Ensures fresh data
    });
    return response;
  } catch (error) {
    console.error("Error fetching donations:", error);
    return null; // Return null if error occurs
  }
};

export const getNearbyNgos = async (lat: number, lng: number, radius: number) => {
  const response = await client.query({
    query: GET_NEARBY_NGOS_QUERY,
    variables: { lat, lng, radius },
  });
  return response.data.nearbyNgos;
};
