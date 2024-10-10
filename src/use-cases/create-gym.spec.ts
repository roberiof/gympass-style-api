import { test, describe, expect, beforeEach } from "vitest";
import { CreateGymUseCase } from "./create-gym";
import InMemoryGymsRepository from "@/http/repositories/in-memory/in-memory-gym-repository";

let inMemoryGymsRepository: InMemoryGymsRepository;
let sut: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository();
    sut = new CreateGymUseCase(inMemoryGymsRepository);
  });

  test("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      name: "Gym 1",
      description: "The best gym in the world",
      phone: "88999620850",
      latitude: -8.0248832,
      longitude: -34.9405184,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
