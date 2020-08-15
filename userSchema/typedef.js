const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-server-express');
const resolvers = require('./resolver');

const typeDefs = gql`
  type AuthPayLoad {
    token: String!
    email: String!
  }

  type User {
      name : String!
      email: String!
      phone : Int!
      password: String!
  }
  type string {
      email : String!
      password : String!
  }
  type Mutation {
    createToken(email: String!, password: String!) : AuthPayLoad!
    verifyToken(token: String!, email:String!): AuthPayLoad!
    createUser(name: String!, email: String!, phone: Int!, password: String!) : User
    loginUser(email: String!, password: String!) : string
    isLoggedIn(email:String!) : String
    updateUser(name: String!, email: String!, phone: Int!, password: String!) : User
    deleteUser(email : String!) : String
    LogoutUser(email: String!) : String
    }

  type Query {
    user: [User]
    person(email: String!) : User
  }
`;

module.exports = makeExecutableSchema({typeDefs,resolvers});