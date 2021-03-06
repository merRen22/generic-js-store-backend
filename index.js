"use strict";

require("dotenv").config();
const express = require("express");
const { makeExecutableSchema } = require("graphql-tools");
const graphqlHTTP = require("express-graphql");
const { readFileSync } = require("fs");
const { join } = require("path");
const cors = require("cors");
const resolvers = require("./src/graphql/resolvers");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./src/models");

const isDev = process.env.NODE_ENV !== "production";

const typeDefs = readFileSync(
  join(__dirname, "src/graphql", "schema.graphql"),
  "utf-8"
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

app.use(cors());

app.use(
  "/api",
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    context: { db },
    graphiql: isDev
  })
);

db.sequelize.sync({ alter: true, force: false }).then(() => {
  app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}/api`);
  });
});
