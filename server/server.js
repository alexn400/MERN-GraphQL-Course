const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');
const { loadFiles, loadFilesSync } = require('@graphql-tools/load-files');
const path = require('path');

const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const http = require('http');
const mongoose = require('mongoose');
require('dotenv').config();
// Express server
const app = express();

// Typedefs
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './typeDefs')));

// Resolvers
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, './resolvers')));

const db = async () => {
  try {
    const success = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    });

    console.log('successfull');
  } catch (e) {
    console.log(e);
  }
};

db();

// Graphql server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// Apply middleware method  - connects apollosever to a specific http framework such as express

apolloServer.applyMiddleware({ app });

// Sever
const httpserver = http.createServer(app);

app.get('/rest', (req, res) => {
  res.send('hehe');
});

// port
app.listen(process.env.PORT, () => {
  console.log(`running on port ${process.env.PORT}`);
  console.log(`Graphql sever is ready at  http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});
