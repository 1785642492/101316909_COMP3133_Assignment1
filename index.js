//101316909 Zhongfan Dong
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { typeDefs, resolvers } = require('./src/schemas/schema');

async function startServer() {
    const app = express();
    const PORT = process.env.PORT || 4000;

    // MongoDB connection
    const mongoURI = "mongodb+srv://k1785642492:qazwsxedcrfv1234@cluster0.opca6yz.mongodb.net/?retryWrites=true&w=majority"; // Replace with your actual connection string
    mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log('MongoDB Connected'))
      .catch(err => console.log(err));

    // Apollo Server setup
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });


    await server.start();

    server.applyMiddleware({ app });

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}${server.graphqlPath}`);
    });
}

startServer();
