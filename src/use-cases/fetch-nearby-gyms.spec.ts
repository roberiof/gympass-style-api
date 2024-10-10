import { test, describe, expect, beforeEach } from "vitest";
import InMemoryGymsRepository from "@/http/repositories/in-memory/in-memory-gym-repository";
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms";

let gymsRepository: InMemoryGymsRepository;
let sut: FetchNearbyGymsUseCase;

describe("Fetch nearby gym use case", () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    sut = new FetchNearbyGymsUseCase(gymsRepository);
  });

  test("should be able to fetch nearby gyms", async () => {
    await gymsRepository.create({
      name: "Near Gym",
      description: "The best gym in the world",
      phone: "88999620850",
      latitude: -8.0248832,
      longitude: -34.9405184,
    });

    await gymsRepository.create({
      name: "Far Gym",
      description: "The best gym in the world",
      phone: "88999620850",
      latitude: -1.0248832,
      longitude: -24.9405184,
    });

    const { gyms } = await sut.execute({
      userLatitude: -8.0248832,
      userLongitude: -34.9405184,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near Gym" })]);
  });
});
