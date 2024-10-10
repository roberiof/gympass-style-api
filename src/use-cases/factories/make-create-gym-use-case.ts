import { CreateGymUseCase } from "../create-gym";
import PrismaGymRepository from "@/http/repositories/prisma/prisma-gym-repository";

export default function makeCreateGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  const createGymUseCase = new CreateGymUseCase(gymRepository);
  return createGymUseCase;
}
