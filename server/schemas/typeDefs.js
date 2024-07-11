const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    transactions: [Transaction]
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

  type Genre {
    _id: ID
    name: String
  }

  type Transaction {
    total: Float
    transaction_date: String
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
    genre(name: String!): [Game]
    transactions(userId: ID!): [Transaction]
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