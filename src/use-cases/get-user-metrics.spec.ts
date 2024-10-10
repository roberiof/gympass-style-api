import { test, describe, expect, beforeEach } from "vitest";
import InMemoryCheckInsRepository from "@/http/repositories/in-memory/in-memory-check-in-repository";
import { GetUserMetricsUseCase } from "./get-user-metrics";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: GetUserMetricsUseCase;

describe("Get user metrics use case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository);
  });

  test("should be able to get metrics", async () => {
    await inMemoryCheckInsRepository.create({
      gymId: "gym-1",
      userId: "user-1",
    });

    const { checkInCounts } = await sut.execute({
      userId: "user-1",
    });

    expect(checkInCounts).toBe(1);
  });
});
