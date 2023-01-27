import { User } from '../types'
import { IUpdateNumberArgs } from '../interfaces/UserRepositories'

export abstract class UserRepository {
    abstract create(address: string): Promise<User>

    abstract get(address: string): Promise<User | null>

    abstract update(address: string, data: Partial<User>): Promise<User>

    abstract updateNumber(address: string, data: IUpdateNumberArgs): Promise<User>
}
