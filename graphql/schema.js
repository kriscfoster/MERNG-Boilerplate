const Book = require('../db/models/Book.js');

const { GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean,
} = require('graphql');

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
    available: { type: GraphQLBoolean }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parentValue, args) {
        return Book.find({});
      }
    },
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return Book.findOne({ id: args.id });
      }
    }
  }
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const book = {
          title: args.title,
          author: args.author,
          available: true,
        }

      const newBook = new Book(book);
      newBook.id = newBook._id;
      const savedBook = await newBook.save();
      return savedBook;
      }
    },
    editBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        title: { type: GraphQLString },
        available: { type: GraphQLBoolean },
        author: { type: GraphQLString },
      },
      async resolve(parentValue, args) {
        const payload = {
          available: args.available,
        }

        book = await Book
          .findOneAndUpdate({id: args.id }, payload, { new: true });
        return book;
      }
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      async resolve(parentValue, args) {
        const book = await Book.findOneAndRemove({ id: args.id });
        return book;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
