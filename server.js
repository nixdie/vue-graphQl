const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// import typeDefs & resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// import env vars and mogoose models
require('dotenv').config({path: 'variables.env'})
const User = require('./models/User');
const Post = require('./models/Post');

// for eliminates errors of mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, {useNewUrlParser: true})
  .then(() => console.log('DB connected'))
  .catch(err => console.log(err))

// create appolo/graphql server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`server listening on ${url}`);
})
