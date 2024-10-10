import { CheckIn, Prisma } from "@prisma/client";
import { CheckInsRepository } from "../check-ins-repository";
import { randomUUID } from "node:crypto";
import dayjs from "dayjs";

export default class InMemoryCheckInsRepository implements CheckInsRepository {
  public checkIns: CheckIn[] = [];

  async save(checkIn: CheckIn): Promise<CheckIn> {
    this.checkIns.find((c) => (c.id === checkIn.id ? checkIn : c));

    return checkIn;
  }

  async findById(id: string): Promise<CheckIn | null> {
    return this.checkIns.find((checkIn) => checkIn.id === id) || null;
  }

  async countByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((checkIn) => checkIn.userId === userId).length;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.checkIns
      .filter((checkIn) => checkIn.userId === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async findUserByIdOnDate(id: string, date: Date): Promise<CheckIn | null> {
    const startOfDay = dayjs(date).startOf("date");
    const endOfDay = dayjs(date).endOf("date");

    const checkIn = this.checkIns.find((checkIn) => {
      const isOnSameDay =
        dayjs(checkIn.createdAt).isAfter(startOfDay) &&
        dayjs(checkIn.createdAt).isBefore(endOfDay);

      return checkIn.userId === id && isOnSameDay;
    });

    return checkIn || null;
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn: CheckIn = {
      ...data,
      id: data.id ?? randomUUID(),
      createdAt: new Date(),
      validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
    };
    this.checkIns.push(checkIn);
    return checkIn;
  }
}
