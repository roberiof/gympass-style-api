import { test, describe, expect, beforeEach, afterEach, vi } from "vitest";
import InMemoryCheckInsRepository from "@/http/repositories/in-memory/in-memory-check-in-repository";
import { ValidateCheckInUseCase } from "./validate-check-in";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";

let checkInRepository: InMemoryCheckInsRepository;
let sut: ValidateCheckInUseCase;

describe("Validate Check In Use Case", () => {
  beforeEach(async () => {
    checkInRepository = new InMemoryCheckInsRepository();
    sut = new ValidateCheckInUseCase(checkInRepository);
    vi.useFakeTimers();
  });

  afterEach(async () => {
    vi.useRealTimers();
  });

  test("should be able to validate check in ", async () => {
    await checkInRepository.create({
      id: "check-in-1",
      gymId: "gym-1",
      userId: "user-1",
    });

    const { checkIn } = await sut.execute({ checkInId: "check-in-1" });

    expect(checkIn.validatedAt).toEqual(expect.any(Date));
    expect(checkInRepository.checkIns[0].validatedAt).toEqual(expect.any(Date));
  });

  test("should be able to validate an inexistent check in ", async () => {
    await expect(
      sut.execute({
        checkInId: "inexistent-check-in-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  test("should not be able to validate an check in after 20 minutes of its creation ", async () => {
    vi.setSystemTime(new Date("2021-01-01T12:00:00"));

    await checkInRepository.create({
      id: "check-in-1",
      gymId: "gym-1",
      userId: "user-1",
    });

    vi.advanceTimersByTime(21 * 60 * 1000); // 21 minutes in milliseconds

    await expect(
      sut.execute({
        checkInId: "check-in-1",
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError);
  });
});
