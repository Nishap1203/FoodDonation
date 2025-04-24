import { gql } from "apollo-server-express";

const adminTypeDefs = gql`
type NGO {
  id: ID!
  name: String!
  email: String!
  phone: String!
  address: String!
  latitude: Float
  longitude: Float
  status: String!
  userId: ID!
}

type NgosQuery{
NGOs : [NGO]!
message : String!
}

type NgoQuery{
Ngo : NGO 
message : String!
}

type FoodServedStats {
  totalFoodServed: Int!
  change: String!
}

type Query {
  getPendingNGOs: NgosQuery
  getNGODetails(id: ID!): NgoQuery
  getAllNGOs: NgosQuery
  totalFoodServed: FoodServedStats!
}

type Mutation {
  approveNGO(id: ID!): NGO
  rejectNGO(id: ID!): NGO
}

`;

export default adminTypeDefs;