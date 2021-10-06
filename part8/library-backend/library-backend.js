const { ApolloServer, gql, UserInputError } = require('apollo-server');

const { v1: uuid } = require('uuid');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://fullStackOpen:fullStackOpen@qraphql.ljnuy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

console.log('connecting to', MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author
    genres: [String]!
    id: ID!
  }
  type Query {
    bookCount: Int
    authorCount: Int!
    allBooks(author: String, genre: String): [Book]
    allAuthors: [Author!]!
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      console.log(context);
      return context.currentUser;
    },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    // allBooks: (root, args) =>
    //   Object.keys(args).length
    //     ? books.filter((book) =>
    //         args.genre
    //           ? book.genres.includes(args.genre)
    //           : args.author === book.author
    //       )
    //     : books,
    allAuthors: async () => await Author.find({}),
    allUsers: async () => await User.find({}),
    allBooks: async () => {
      return await Book.find({}).populate('author');
    },
  },
  Author: {
    bookCount: (root) => {
      return Book.collection.countDocuments();
    },
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
      });

      try {
        return await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };
      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
    addBook: async (root, args) => {
      let author;
      let book;

      if (!currentUser) {
        throw new UserInputError('You must be logged in to edit an author');
      }

      try {
        const bookAlreadyExist = await Book.findOne({ title: args.title });

        author = await Author.findOne({ name: args.author });
        if (!author) {
          author = new Author({ name: args.author });
          await author.save();
        }

        book = new Book({ ...args, author });
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new UserInputError('You must be logged in to edit an author');
      }

      try {
        const author = await Author.findOne({ name: args.name });
        author.born = args.setBornTo;
        return await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decoded = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
