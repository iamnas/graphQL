import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'


async function main() {
    const app = express()

    app.use(express.json());

    const PORT = Number(process.env.PORT) || 8000

    const typeDefs = `
        type Query {
            hello: String
        }
    `;

    // Define resolvers
    const resolvers = {
        Query: {
            hello: () => 'Hello, world!',
        },
    };


    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()



    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running" })
    })


    app.use('/graphql', expressMiddleware(server))

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })


}

main().catch((err) => {
    console.error(err)
})