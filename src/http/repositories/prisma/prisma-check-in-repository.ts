import prisma from "@/lib/prisma";
import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import dayjs from "dayjs";

export default class PrismaCheckInRepository implements CheckInsRepository {
  async save(checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return updatedCheckIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    });

    return checkIn;
  }

  async countByUserId(userId: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        userId,
      },
    });

    return count;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    const pageSize = 2;
    const checkIns = await prisma.checkIn.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return checkIns;
  }

  async findUserByIdOnDate(id: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("day").toDate();
    const endOfDay = dayjs(date).endOf("day").toDate();

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        userId: id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });
    return checkIn;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const user = await prisma.checkIn.create({ data });
    return user;
  }
}
