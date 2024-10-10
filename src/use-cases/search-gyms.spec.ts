import { test, describe, expect, beforeEach } from "vitest";
import InMemoryGymsRepository from "@/http/repositories/in-memory/in-memory-gym-repository";
import { SearchGymsUseCase } from "./search-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: SearchGymsUseCase;

describe("Fetch use check-in use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new SearchGymsUseCase(gymsRepository);
  });

  test("should be able to fetch user check in history", async () => {
    await gymsRepository.create({
      name: "Gym 1",
      description: "The best gym in the world",
      phone: "88999620850",
      latitude: -8.0248832,
      longitude: -34.9405184,
    });

    await gymsRepository.create({
      name: "Gym 2",
      description: "The best gym in the world",
      phone: "88999620850",
      latitude: -8.0248832,
      longitude: -34.9405184,
    });

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 1,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ name: "Gym 1" }),
      expect.objectContaining({ name: "Gym 2" }),
    ]);
  });

  test("should be able to fetch user check in history paginated", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        name: `Gym ${i}`,
        description: "The best gym in the world",
        phone: "88999620850",
        latitude: -8.0248832,
        longitude: -34.9405184,
      });
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    });

    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ id: "gym-21" }),
      expect.objectContaining({ id: "gym-22" }),
    ]);
  });
});
