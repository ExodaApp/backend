import { User } from '../types'

export abstract class UserRepository {
    abstract create(address: string): Promise<User>

    abstract get(address: string): Promise<User | null>
}
