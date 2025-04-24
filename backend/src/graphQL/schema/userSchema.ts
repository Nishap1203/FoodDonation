import { gql } from "graphql-tag";

const userTypeDefs = gql`
  enum Role {
    ADMIN
    NGO
    USER
    DONOR
  }

  type User {
    id: ID!
    email: String!
    name: String
    phone: String
    address: String
    role: Role
    createdAt: String!
  }

  type Donation {
    id: ID!
    foodType: String!
    description: String
    expiryDate: String!
    status: String!
    location: String
    quantity: Int
    donor: User!
  }

  type UsersRes {
    Users: [User]
    message: String!
  }
  type UserRes {
    User: User
    message: String!
  }

  type DonationsRes {
    Donations: [Donation]
    message: String!
  }
  type DonationRes {
    Donation: Donation
    message: String!
  }
  type Query {
    userProfile: UserRes
    getAllUsers: UsersRes
    getUserById(id: ID!): UserRes
    getAllDonations: DonationsRes
    getMyDonations: DonationsRes
    getDonationById(id: ID!): DonationRes
  }

  type Mutation {
    updateProfile(
      name: String
      phone: String
      email:String
      address: String
    ): UserRes
    createDonation(
      foodType: String!
      description: String
      expiryDate: String!
      location: String
      quantity: Int
    ): DonationRes
    cancelDonation(id: ID!): DonationRes
    completeDonation(id: ID!): DonationRes
  }
`;



export default userTypeDefs;