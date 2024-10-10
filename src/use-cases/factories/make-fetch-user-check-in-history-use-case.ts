import PrismaCheckInRepository from "@/http/repositories/prisma/prisma-check-in-repository";
import { FetchUserCheckInHistoryUseCase } from "../fetch-user-check-in-history";

export default function makeFetchUserCheckInHistoryUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const aux = new FetchUserCheckInHistoryUseCase(checkInRepository);
  return aux;
}
