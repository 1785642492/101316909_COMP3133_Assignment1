const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  type AuthPayload {
    token: String!
    user: User
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    salary: Float!
  }

  input EmployeeUpdateInput {
    first_name: String
    last_name: String
    email: String
    gender: String
    salary: Float
  }

  type Query {
    login(username: String!, password: String!): AuthPayload
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID!): Employee
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    addNewEmployee(input: EmployeeInput!): Employee
    updateEmployeeById(id: ID!, input: EmployeeUpdateInput!): Employee
    deleteEmployeeById(id: ID!): String
  }
`;

module.exports = { typeDefs };
