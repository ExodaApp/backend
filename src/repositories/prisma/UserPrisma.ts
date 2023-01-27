import { PrismaClient } from "@prisma/client";

import { User } from "../../types";
import { UserRepository } from "../UserRepository";
import { IUpdateNumberArgs } from "../../interfaces/UserRepositories";

export class UserPrisma implements UserRepository {
  private readonly _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  create(address: string): Promise<User> {
    return this._prisma.user.create({ data: { address } });
  }

  get(address: string): Promise<User | null> {
    return this._prisma.user.findUnique({
      where: { address },
    });
  }

  update(address: string, data: Partial<User>): Promise<User> {
    return this._prisma.user.update({
      where: {
        address,
      },
      data,
    });
  }

  updateNumber(address: string, data: IUpdateNumberArgs): Promise<User> {
    return this._prisma.user.update({
        where: {
            address,
        },
        data,
    })
  }
}
