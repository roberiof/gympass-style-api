import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/http/repositories/check-ins-repository";
import { GymsRepository } from "@/http/repositories/gyms-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import getDistanceBetweenCoordinates from "@/utils/getDistanceBetweenCoordinates";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckIns } from "./errors/max-number-of-check-ins-error";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    userId,
    gymId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);

    if (!gym) {
      throw new ResourceNotFoundError();
    }

    const distance = getDistanceBetweenCoordinates(
      { lat: gym.latitude.toNumber(), lon: gym.longitude.toNumber() },
      { lat: userLatitude, lon: userLongitude },
    );
    const MAX_DISTANCE_IN_KM = 0.1;
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new MaxDistanceError();
    }

    const hasCheckedInToday = await this.checkInsRepository.findUserByIdOnDate(
      userId,
      new Date(),
    );

    if (hasCheckedInToday) {
      throw new MaxNumberOfCheckIns();
    }

    const checkIn = await this.checkInsRepository.create({
      gymId,
      userId,
    });

    return { checkIn };
  }
}
