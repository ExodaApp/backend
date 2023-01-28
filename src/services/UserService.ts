import { User } from '../types'
import { UserRepository } from '../repositories/UserRepository'

export class UserService {
    constructor(private readonly _userRepository: UserRepository) {}

    async getUser(userAddress: string): Promise<User | null> {
        return this._userRepository.get(userAddress)
    }

    async createUser(userAddress: string): Promise<User> {
        return this._userRepository.create(userAddress)
    }

    async getNonce(userAddress: string): Promise<number | null> {
        let user = await this._userRepository.get(userAddress)

        if (!user)
            return null

        return user.nonce
    }

    async increaseNonce(userAddress: string): Promise<User> {
        return this._userRepository.updateNumber(userAddress, { nonce: { increment: 1 } })
    }
}
