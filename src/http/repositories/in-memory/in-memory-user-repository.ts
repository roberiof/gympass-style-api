import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export default class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async findUnique(data: Prisma.UserFindUniqueArgs) {
    const { where } = data;

    const user = this.users.find((i) => {
      if (where.id) {
        return i.id === where.id;
      } else if (where.email) {
        return i.email === where.email;
      }
      return false;
    });

    return user || null;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = { ...data, id: randomUUID(), createdAt: new Date() };
    this.users.push(user);
    return user;
  }
}
