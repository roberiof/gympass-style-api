import prisma from "@/lib/prisma";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { Gym, Prisma } from "@prisma/client";

export default class PrismaGymRepository implements GymsRepository {
  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({ data });
    return gym;
  }

  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    });
    return gym;
  }

  async findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> {
    const { latitude, longitude } = params;
    const gyms = prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `;
    return gyms;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = prisma.gym.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    });

    return gyms;
  }
}
