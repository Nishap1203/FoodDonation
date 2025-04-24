import { gql } from "@apollo/client";
import client from "../apollo/client";


// Define GraphQL mutations
const REGISTER_NGO_MUTATION = gql`
  mutation RegisterNGOLocation($name: String!, $email: String!, $phone: String!, $address: String!, $password: String!) {
    registerNGOLocation(name: $name, email: $email, phone: $phone, address: $address, password: $password) { 
      message
      NGOs {
        id
        name
        email
        phone
        address
      }
    }
  }
`;


const GET_PENDING_NGOS_QUERY = gql`
  query GetPendingNGOs {
    pendingNGOs {
      id
      name
      email
      phone
      address
    }
  }
`;

const APPROVE_NGO_MUTATION = gql`
  mutation ApproveNGO($ngoId: String!) {
    approveNGO(ngoId: $ngoId) {
      id
      name
      status
    }
  }
`;

const REJECT_NGO_MUTATION = gql`
  mutation RejectNGO($ngoId: String!) {
    rejectNGO(ngoId: $ngoId) {
      id
      name
      status
    }
  }
`;

// API functions
export const registerNGO = async (ngoData: { name: string; email: string; phone: string; address: string; password: string }) => {
  const response = await client.mutate({
    mutation: REGISTER_NGO_MUTATION,
    variables: {
      name: ngoData.name,
      email: ngoData.email,
      phone: ngoData.phone,
      address: ngoData.address,
      password : ngoData.password,
    },  // ✅ Correct: Passing individual fields
  });
  return response.data.registerNGOLocation;
};


export const getPendingNGOs = async () => {
  const response = await client.query({
    query: GET_PENDING_NGOS_QUERY,
  });
  return response.data.pendingNGOs;
};

export const approveNGO = async (ngoId: string) => {
  const response = await client.mutate({
    mutation: APPROVE_NGO_MUTATION,
    variables: { ngoId },
  });
  return response.data.approveNGO;
};

export const rejectNGO = async (ngoId: string) => {
  const response = await client.mutate({
    mutation: REJECT_NGO_MUTATION,
    variables: { ngoId },
  });
  return response.data.rejectNGO;
};
