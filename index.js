"use strict";

require("dotenv").config();
const express = require("express");
const { makeExecutableSchema } = require("graphql-tools");
const graphqlHTTP = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const resolvers = require("./src/graphql/resolvers");
const app = express();
const port = process.env.port || 3000;

const db = require("./src/models");

const typeDefs = readFileSync(
  join(__dirname, "src/graphql", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    context: { db },
    graphiql: true
  })
);

db.sequelize.sync({ alter: true, force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`);
  });
});
