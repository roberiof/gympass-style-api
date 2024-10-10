import { Gym, Prisma } from "@prisma/client";
import { FindManyNearbyParams, GymsRepository } from "../gyms-repository";
import { randomUUID } from "crypto";
import getDistanceBetweenCoordinates from "@/utils/getDistanceBetweenCoordinates";

export default class InMemoryGymsRepository implements GymsRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym: Gym = {
      ...data,
      id: data.id ?? randomUUID(),
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    };
    this.gyms.push(gym);
    return gym;
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);
    return gym || null;
  }

  async searchMany(query: string, page: number): Promise<Gym[]> {
    return this.gyms
      .filter((gym) => gym.name.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby(data: FindManyNearbyParams): Promise<Gym[]> {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        {
          lat: data.latitude,
          lon: data.longitude,
        },
        {
          lat: gym.latitude.toNumber(),
          lon: gym.longitude.toNumber(),
        },
      );

      return distance <= 10; // 10km
    });
  }
}
