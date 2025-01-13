import { ApolloServer } from "@apollo/server";
import prisma from "../lib/db";
import { User } from './user'

export default async function createApolloGraphqlServer() {
    const typeDefs = `
            type Query {
                hello: String
            }
            type Mutation {
            ${User.mutations}
            }
        `;

    // Define resolvers
    const resolvers = {
        Query: {
            ...User.resolvers.queries
        },
        Mutation: {
            ...User.resolvers.mutations
        }
    };


    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()


    return server;


}