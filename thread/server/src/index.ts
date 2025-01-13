import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import createApolloGraphqlServer from './graphql';
import UserService from './service/user';


async function main() {
    const app = express()

    app.use(express.json());

    const PORT = Number(process.env.PORT) || 8000

    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running" })
    })

    // @ts-expect-error
    app.use('/graphql', expressMiddleware(await createApolloGraphqlServer(), {
        context: async ({ req }) => {
            const token: string | undefined = req.headers['authorization']

            try {
                if (!token) {
                    throw new Error(`No authorization header token provided`)
                }

                const user = UserService.decodeJWTToken(token)
                return { user };
            } catch (error) {
                return {}
            }
        }
    }))

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })


}

main().catch((err) => {
    console.error(err)
})