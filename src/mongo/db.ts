import { MongoClient } from 'mongodb'

import dotenv from 'dotenv'
import {UserDBType} from "../repositories/users-repository";
dotenv.config()

const mongoURI = process.env.mongoURI || 'mongodb://0.0.0.0:27017'
console.log(mongoURI)

const client = new MongoClient(mongoURI)
const db = client.db('hw')
export const usersCollection = db.collection<UserDBType>('users')

export async function runDb() {
    try {
        await client.connect()
        await db.command({ ping: 1 })
        console.log('it is ok')
    } catch (e) {
        console.log('no connection')
        await client.close()
    }
}
