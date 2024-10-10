import PrismaCheckInRepository from "@/http/repositories/prisma/prisma-check-in-repository";
import { CheckInUseCase } from "../check-in";
import PrismaGymRepository from "@/http/repositories/prisma/prisma-gym-repository";

export default function makeCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const gymRepository = new PrismaGymRepository();
  const aux = new CheckInUseCase(checkInRepository, gymRepository);
  return aux;
}
