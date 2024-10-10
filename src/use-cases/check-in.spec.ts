import { test, describe, expect, beforeEach, afterEach, vi } from "vitest";
import { CheckInUseCase } from "./check-in";
import InMemoryCheckInsRepository from "@/http/repositories/in-memory/in-memory-check-in-repository";
import InMemoryGymsRepository from "@/http/repositories/in-memory/in-memory-gym-repository";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckIns } from "./errors/max-number-of-check-ins-error";

let inMemoryCheckInsRepository: InMemoryCheckInsRepository;
let inMemoryGymsRepository: InMemoryGymsRepository;
let checkInUseCase: CheckInUseCase;

describe("Check in use case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
    inMemoryGymsRepository = new InMemoryGymsRepository();
    checkInUseCase = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository,
    );
    vi.useFakeTimers();
    await inMemoryGymsRepository.create({
      id: "gym-1",
      name: "Gym 1",
      latitude: -8.0248832,
      longitude: -34.9405184,
    });
  });

  afterEach(async () => {
    vi.useRealTimers();
  });

  test("should be able to check in", async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: "gym-1",
      userId: "tempUserId",
      userLatitude: -8.0248832,
      userLongitude: -34.9405184,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });

  test("should not be able to check in twice in the same day", async () => {
    await checkInUseCase.execute({
      gymId: "gym-1",
      userId: "tempUserId",
      userLatitude: -8.0248832,
      userLongitude: -34.9405184,
    });

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-1",
        userId: "tempUserId",
        userLatitude: -8.0248832,
        userLongitude: -34.9405184,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckIns);
  });

  test("should be able to check in twice but in different days", async () => {
    vi.setSystemTime(new Date(2024, 1, 1, 0));

    await checkInUseCase.execute({
      gymId: "gym-1",
      userId: "tempUserId",
      userLatitude: -8.0248832,
      userLongitude: -34.9405184,
    });

    vi.setSystemTime(new Date(2024, 1, 2, 0));

    expect(() =>
      checkInUseCase.execute({
        gymId: "gym-1",
        userId: "tempUserId",
        userLatitude: -8.0248832,
        userLongitude: -34.9405184,
      }),
    ).toBeTruthy();
  });

  test("should not be able to check in on distant gym", async () => {
    await inMemoryGymsRepository.create({
      id: "gym-2",
      name: "Gym 2",
      latitude: -5.1248832,
      longitude: -34.3405184,
    });

    await expect(() =>
      checkInUseCase.execute({
        gymId: "gym-2",
        userId: "tempUserId",
        userLatitude: -8.0248832,
        userLongitude: -34.9405184,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError);
  });
});
