import PrismaCheckInRepository from "@/http/repositories/prisma/prisma-check-in-repository";
import { GetUserMetricsUseCase } from "../get-user-metrics";

export default function makeGetUserMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInRepository();
  const aux = new GetUserMetricsUseCase(checkInsRepository);
  return aux;
}
