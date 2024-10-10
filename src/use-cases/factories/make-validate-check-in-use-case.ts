import PrismaCheckInRepository from "@/http/repositories/prisma/prisma-check-in-repository";
import { ValidateCheckInUseCase } from "../validate-check-in";

export default function makeValidateCheckInUseCase() {
  const checkInRepository = new PrismaCheckInRepository();
  const aux = new ValidateCheckInUseCase(checkInRepository);
  return aux;
}
