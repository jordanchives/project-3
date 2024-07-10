const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Game {
    _id: ID
    name: String
    storyline: String
    summary: String
    price: Float
    cover: String
    genres: [String]
  }

  type Transaction {
    _id: ID
  }

  type Auth {
    token: ID!
    user: User
  }
  
  type AuthPayload {
    success: Boolean!
    message: String
    user: User
  }

  type Query {
    users: [User]
    user: User
    games: [Game]
    game: Game
    transactions: [Transaction]
    transaction: Transaction
  }

  type Mutation {
    authenticateUser(username: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): Auth
    logout: Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;