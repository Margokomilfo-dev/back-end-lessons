import {ObjectId} from "mongodb"

export const usersRepository = {
    async createUser (newUser:userDBType ) {

    },

}
export type userDBType = {
    _id: ObjectId,
    userName: string,
    salt:string,
    passwordHash:string,
    createdAt: Date
}