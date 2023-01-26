import { User } from '../types'
import { UserRepository } from '../repositories/UserRepository'

export class UserService {
    constructor(private readonly _userRepository: UserRepository) {}

    async getUser(address: string): Promise<User | null> {
        return this._userRepository.get(address)
    }

    async createUser(address: string): Promise<User> {
        return this._userRepository.create(address)
    }

    async getNonce(address: string): Promise<number | null> {
        let user = await this._userRepository.get(address)

        if (!user)
            return null

        return user.nonce
    }
}
