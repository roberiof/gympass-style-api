import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/http/repositories/check-ins-repository";

interface FetchUserCheckInHistoryUseCaseRequest {
  userId: string;
  page: number;
}

interface FetchUserCheckInHistoryUseCaseResponse {
  history: CheckIn[];
}

export class FetchUserCheckInHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInHistoryUseCaseRequest): Promise<FetchUserCheckInHistoryUseCaseResponse> {
    const history = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );

    return { history };
  }
}
