import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {UserDBType, usersRepository} from "./repositories/users-repository";


export const usersService = {
    async createUser (login: string, password: string, email: string) {
        const salt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, salt)
        const newUser:UserDBType = {
            _id: new ObjectId(),
            userName: login,
            salt,
            passwordHash,
            createdAt: new Date()
        }
        return usersRepository.createUser(newUser)
    },
    async checkCredentials(loginOrEmail: string, password: string){
        const user = await usersRepository.findByLoginOrEmail(loginOrEmail)
        if(!user) return false
        const passwordHash = await this._generateHash(password,user.salt)
        return user.passwordHash === passwordHash;


    },
    async findUserById(id: ObjectId) {
        return usersRepository.findById(id)
    },
    async _generateHash(password: string,salt:string){
        const hash = await bcrypt.hash(password, salt)
        console.log('hash:', hash)
        return hash
    }
}