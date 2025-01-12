import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4'
import axios from 'axios'


async function startApolloServer() {
    const app = express();

    const server = new ApolloServer({

        typeDefs: `
        type User {
            id:ID!,
            name:String!,
            username:String!,
            email:String!,
            phone:String!,
            website:String!
        }

        type Todo{
        id:ID!,
        title:String!,
        completed:Boolean,
        user:User,
        }

        type Query{
        getTodos:[Todo]
        getAllUsers:[User]
        getUserById(id:ID!):User
        }
        `,
        resolvers: {
            Todo: {
                user: async (todo) => {
                    try {
                        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
                        return response.data;
                    } catch (error: any) {
                        console.error(`Error fetching user for todo ${todo.id}:`, error.message);
                        return null; // Return null if user fetch fails
                    }
                },
            },

            Query: {
                getTodos: () => axios.get('https://jsonplaceholder.typicode.com/todos').then(res => res.data),
                getAllUsers: () => axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data),
                getUserById: (_, { id }) => axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then(res => res.data)

                //     [
                //     { id: '1', title: 'Learn GraphQL', completed: false },
                //     { id: '2', title: 'Build an Apollo Server', completed: true },
                // ],
            },
        },
    });
    app.use(express.json());
    app.use(cors());


    await server.start()

    app.use('/graphql', expressMiddleware(server));

    app.listen(4000, () => {
        console.log('Server running on http://localhost:4000/graphql');
    });


}


startApolloServer();

