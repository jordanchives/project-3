const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    library: [LibraryGame]!
    transactions: [Transaction]!
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
    transaction_date: Date
    total: Number
    games: [TransactionGame]!
  }

  type LibraryGame {
    game: Game
    purchase_date: Date
  }

  type TransactionGame {
    game: Game
    price: Float
    }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    games: [Game]
    transactions: [Transaction]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    logout: Auth
    addUser(username: String!, email: String!, password: String!): Auth
    updateUser(username: String, email: String, password: String): User
  }
`;

module.exports = typeDefs;