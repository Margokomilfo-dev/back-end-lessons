import {UserDBType} from "../repositories/users-repository";

declare global {
    namespace Express {
        export interface Request {
            user: UserDBType | null
        }
    }
}