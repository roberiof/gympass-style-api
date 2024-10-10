import { test, describe, expect, beforeEach } from "vitest";
import { FetchUserCheckInHistoryUseCase } from "./fetch-user-check-in-history";
import InMemoryCheckInsRepository from "@/http/repositories/in-memory/in-memory-check-in-repository";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let sut: FetchUserCheckInHistoryUseCase;

describe("Fetch use check-in use case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    sut = new FetchUserCheckInHistoryUseCase(inMemoryCheckInsRepository);
  });

  test("should be able to fetch user check in history", async () => {
    await inMemoryCheckInsRepository.create({
      gymId: "gym-1",
      userId: "user-1",
    });
    await inMemoryCheckInsRepository.create({
      gymId: "gym-2",
      userId: "user-1",
    });

    const { history } = await sut.execute({
      userId: "user-1",
      page: 1,
    });

    expect(history).toHaveLength(2);
    expect(history).toEqual([
      expect.objectContaining({ gymId: "gym-1" }),
      expect.objectContaining({ gymId: "gym-2" }),
    ]);
  });

  test("should be able to fetch user check in history paginated", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gymId: `gym-${i}`,
        userId: "user-1",
      });
    }

    const { history } = await sut.execute({
      userId: "user-1",
      page: 2,
    });

    expect(history).toHaveLength(2);
    expect(history).toEqual([
      expect.objectContaining({ gymId: "gym-21" }),
      expect.objectContaining({ gymId: "gym-22" }),
    ]);
  });
});
