import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {userDBType, usersRepository} from "./repositories/users-repository";


export const usersService = {
    async createUser (login: string, password: string, email: string) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, salt)
        const newUser:userDBType = {
            _id: new ObjectId(),
            userName: login,
            salt,
            passwordHash,
            createdAt: new Date()
        }
        return usersRepository.createUser(newUser)
    },

    async _generateHash(password: string,salt:string){
        const hash = await bcrypt.hash(password, salt)
        console.log('hash:', hash)
        return hash
    }
}