const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const { books, authors } = require('./data');

const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'Book written by an author',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    authorId: { type: GraphQLNonNull(GraphQLInt) },
    author: { type: AuthorType, resolve: (book) => authors.find((author) => author.id === book.authorId) },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Author of books',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    books: { type: GraphQLList(BookType), resolve: (author) => books.filter((book) => book.id === author.id) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'Root Query',
  fields: () => ({
    book: {
      type: BookType,
      description: 'One book',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => books.find((book) => book.id === args.id),
    },
    books: {
      type: new GraphQLList(BookType),
      description: 'List of books',
      resolve: () => books,
    },
    author: {
      type: AuthorType,
      description: 'One author',
      args: {
        id: { type: GraphQLInt },
      },
      resolve: (parent, args) => authors.find((author) => author.id === args.id),
    },
    authors: {
      type: new GraphQLList(AuthorType),
      description: 'List of authors',
      resolve: () => authors,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

module.exports = { schema };
