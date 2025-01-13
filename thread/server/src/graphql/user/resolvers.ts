import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../service/user"

const queries = {
    getUserToken: async (_: any, payload: GetUserTokenPayload) => {
        const res = await UserService.getUserToken(payload)
        return res;
    },

    getCurrentLoggedInUser: async (_: any, _paremeters: any, context: any) => {
        // console.log(context);
        if(context && context.user)
           
        return await UserService.getUserById(context.user.id)

        throw new Error(`UserService`)
    }
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload)
        return res.id
    }
}

export const resolvers = { queries, mutations } 