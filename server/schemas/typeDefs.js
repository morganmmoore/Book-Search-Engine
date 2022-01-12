const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        email: String
        username: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        _id: ID
        authors: [String]
        bookId: String
        description: String
        image: String
        title: String
        link: String
        forSale: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        me: User
    }
    input SavedBookInput {
        authors: [String]
        description: String
        bookId: String
        image: String
        forSale: String
        link: String
        title: String
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String], description: String, title: String, bookId: String, image: String, link: String): User
        removeBook(bookId: String): User
    }
`;

module.exports = typeDefs;