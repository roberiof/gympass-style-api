import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { UsersRepository } from "../users-repository";

export default class PrismaUserRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findUnique(data: Prisma.UserFindUniqueArgs) {
    const user = await prisma.user.findUnique(data);
    return user;
  }
}
