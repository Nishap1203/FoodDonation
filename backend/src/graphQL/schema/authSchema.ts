import { gql } from "apollo-server-express";

 const authTypeDefs = gql`
  type SignUpResponse {
    message: String!
    email: String
   
  }

  type LoginResponse {
    message: String!
    token: String
    user: User
   
  }

  type GenericResponse {
    message: String!
    
  }

  type Mutation {
    signUp(email: String!, password: String!): SignUpResponse!
    confirmSignUp(email: String!, code: String!): GenericResponse!
    login(email: String!, password: String!): LoginResponse!
    logout: GenericResponse!
    forgotPassword(email: String!): GenericResponse!
    changePassword(email: String!, code: String!, password: String!): GenericResponse!
    resendCode(email: String!): GenericResponse!
  }
`;

export default authTypeDefs