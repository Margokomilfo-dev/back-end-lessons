import {ObjectId} from "mongodb"
import {usersCollection} from "../mongo/db";

export const usersRepository = {
    async createUser (newUser:UserDBType ) {

    },
    async findByLoginOrEmail (loginOrEmail:string ): Promise<UserDBType | null> {
        return usersCollection.findOne({$or: [{email: loginOrEmail}, {userName: loginOrEmail}]}, {projection: {_id: 0}})
    },

    async findById (id:ObjectId ) {
        return usersCollection.findOne({_id: id})
    },

}
export type UserDBType = {
    _id: ObjectId,
    userName: string,
    // salt:string,
    passwordHash:string,
    createdAt: Date
}