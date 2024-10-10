import { Prisma, User } from "@prisma/client";

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>;
  findUnique(data: Prisma.UserFindUniqueArgs): Promise<User | null>;
}
