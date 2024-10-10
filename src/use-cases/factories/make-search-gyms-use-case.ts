import PrismaGymRepository from "@/http/repositories/prisma/prisma-gym-repository";
import { SearchGymsUseCase } from "../search-gyms";

export default function makeSearchGymsUseCase() {
  const gymRepository = new PrismaGymRepository();
  const aux = new SearchGymsUseCase(gymRepository);
  return aux;
}
