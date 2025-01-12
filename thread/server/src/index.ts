import express from 'express'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import  prisma  from './lib/db';



async function main() {
    const app = express()

    app.use(express.json());

    const PORT = Number(process.env.PORT) || 8000

    const typeDefs = `
        type Query {
            hello: String
            say(name: String) : String
        }

        type Mutation {
            createUser(email: String!,firstName: String!,lastName: String!,password: String!):Boolean
        }

    `;

    // Define resolvers
    const resolvers = {
        Query: {
            hello: () => 'Hello, world!',
            say: (_:any, { name }: { name: string }) => `Hey ${name}!`,
        },
        Mutation: {
            createUser: async (_:any, { email, firstName, lastName, password }: {
                email: string, firstName: string, lastName: string, password: string
            }) => {

                const data = await prisma.user.create({
                    data: {
                        email,
                        firstName,
                        lastName,
                        password,
                        salt: 'salt'
                    }
                })

            

                return true;

            }
        }
    };


    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    await server.start()



    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running" })
    })


    //@ts-ignore
    app.use('/graphql', expressMiddleware(server))

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })


}

main().catch((err) => {
    console.error(err)
})