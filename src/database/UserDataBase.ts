import { User } from "../models/User";
import { TUserDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

    public findUser = async (q: string): Promise<TUserDB[]> => {
        if (q) {
            const result: TUserDB[] = await BaseDatabase.connection('users').whereLike('name', `%${q}%`)
            return result
        } else {
            const result: TUserDB[] = await BaseDatabase.connection('users')
            return result
        }
    }

    public findUserById =async (id: string): Promise<TUserDB | undefined> => {
        const [result] = await BaseDatabase.connection('users').where({id})

        return result
    }

    public insertUser =async (user:User): Promise<void> => {
        
        await BaseDatabase.connection('users').insert(
            {
                id: user.getId(),
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword(),
                created_at: user.getCreatedAt()
            }
        )
    }
}

new UserDatabase()