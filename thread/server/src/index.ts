import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import createApolloGraphqlServer from './graphql';


async function main() {
    const app = express()

    app.use(express.json());

    const PORT = Number(process.env.PORT) || 8000

    app.get('/', (req, res) => {
        res.json({ message: "Server is up and running" })
    })

    // @ts-expect-error
    app.use('/graphql', expressMiddleware(await createApolloGraphqlServer()))

    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    })


}

main().catch((err) => {
    console.error(err)
})