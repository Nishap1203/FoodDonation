import { gql } from "@apollo/client";

export const GET_NEAREST_NGO = gql`
  query GetNearestNGO($lat: Float!, $long: Float!, $radius: Float!) {
    getNearestNGO(lat: $lat, long: $long, radius: $radius) {
      message
      NGOs {
        id
        name
        address
      }
    }
  }
`;

export const GET_ADMIN_DASHBOARD_DATA = gql`

  query GetAdminDashboardData {
    totalDonated
    foodWastage
    registeredNGOs
  }
`;

export const GET_DONATIONS = gql`
  query GetDonations {
    donations {
      id
      foodType
      quantity
      expiryDate
    }
  }
`;
