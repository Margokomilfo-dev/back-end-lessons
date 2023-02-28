import {UserDBType} from "../repositories/users-repository";
import jwt from "jsonwebtoken";
import {ObjectId} from "mongodb";


export const jwtService = {
    async createJWTToken(user: UserDBType): Promise<string> {
        return jwt.sign({userId: user._id}, 'hello', {expiresIn: '1h'})

    },
    async getUserIdByToken(token: string): Promise<ObjectId | null> {
        try {
            const res: any = jwt.verify(token, 'hello')
            return new ObjectId(res.userId)
        } catch (e) {
            return null
        }
    },

}