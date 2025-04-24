import { gql } from "apollo-server-express"

export const ngoTypeDef = gql`
type NGO {
  id: ID!
  name: String!
  email: String!
  phone: String!
  address: String!
  latitude: Float!
  longitude: Float!
  status: String!
  user: User!
}

type Request {
  id: ID!
  foodName: String!
  quantity: String!
  status: String!
  ngo: NGO!
}

type NgoRes{
message : String!
NGOs : [NGO]
}

type FoodRes{
message : String!
Requests : Request
}

type Query {
  getNearestNGO(lat: Float!, long: Float!, radius: Float!): NgoRes
  getAllFoodRequests: [Request]
  getAllNgoReq(ngoId: ID!): [Request]
}

type Mutation {
  registerNGOLocation(name: String!, email: String!, phone: String!, address: String!): NgoRes
  createFoodRequest(foodName: String!, quantity: String!): FoodRes
  fulfillFoodRequest(requestId: ID!): String
}`;

export default ngoTypeDef;