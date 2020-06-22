const express = require('express');
const expressGQ = require('express-graphql');
const { schema } = require('./schema');

const app = express();

app.use(
  '/graphql',
  expressGQ({
    graphiql: true,
    schema,
  }),
);
app.listen(5000, () => console.log('Server running'));
