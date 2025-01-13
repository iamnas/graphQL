import { ApolloServer } from "@apollo/server";
import prisma from "../lib/db";
import { User } from './user'

export default async function createApolloGraphqlServer() {
    const typeDefs = `
            ${User.typeDefs}
            
            type Query {
                ${User.queries}
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