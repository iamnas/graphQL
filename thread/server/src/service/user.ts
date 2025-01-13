import prisma from "../lib/db"
import { createHmac, randomBytes } from "node:crypto"

import JWT from "jsonwebtoken";

export interface CreateUserPayload {
    firstName: string
    lastName: string
    email: string
    password: string

}

export interface GetUserTokenPayload {
    email: string
    password: string
}

const JWT_SECRET = '$uperM@n@123'

class UserService {
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload
        const salt = randomBytes(32).toString('hex')
        const hashPassword = this.generateHash(password, salt)
        return prisma.user.create({
            data: { firstName: firstName, lastName: lastName, email: email, password: hashPassword, salt: salt },
        })
    }

    public static async getUserToken(payload: GetUserTokenPayload) {

        const { email, password } = payload;
        const userData = await UserService.getUserByEmail(email)
        if (!userData) throw new Error('user now found');
        const usersHashPassword = this.generateHash(password, userData.salt); 
        if (usersHashPassword !== userData.password) throw new Error('Invalid password');

        

        // Gen Token
        const token = JWT.sign({ id: userData.id, email: userData.email }, JWT_SECRET)
        return token;


    }

    private static getUserByEmail(email: string) {
        return prisma.user.findUnique({
            where: { email: email },
        })
    }

    private static generateHash(password: string, salt: string) {
        return createHmac('sha256', salt).update(password).digest('hex');
    }
}


export default UserService;