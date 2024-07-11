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
    genres: [Genre]
  }
  
  type Genre {
    _id: ID
    name: String
  }

  type Transaction {
    _id: ID
    userId: ID
    
    amount: Float
    date: String
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
    genre: Genre
    genres: [Genre]
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