const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const { ApolloServer } = require('apollo-server-express');
const isEmail = require('isemail');
const typeDefs = require('./schema');
const { createStore } = require('./utils');
const resolvers = require('./resolvers');
const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const PORT = process.env.PORT || 5000;
const app = express();
const store = createStore();

const apollo = new ApolloServer({
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = (req.headers && req.headers.authorization) || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    // if the email isn't formatted validly, return null for user
    if (!isEmail.validate(email)) return { user: null };
    // find a user by their email
    const users = await store.users.findOrCreate({ where: { email } });
    const user = users && users[0] ? users[0] : null;

    return { user: { ...user.dataValues } };
  },
  typeDefs,
  resolvers,
  dataSources: () => ({
    launchAPI: new LaunchAPI(),
    userAPI: new UserAPI({ store }),
  })
});

app.use(express.static(path.join(__dirname, '../build')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});
apollo.applyMiddleware({ app });
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));
