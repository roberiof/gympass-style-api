import PrismaGymRepository from "@/http/repositories/prisma/prisma-gym-repository";
import { FetchNearbyGymsUseCase } from "../fetch-nearby-gyms";

export default function makeFetchNearbyGymUseCase() {
  const gymRepository = new PrismaGymRepository();
  const aux = new FetchNearbyGymsUseCase(gymRepository);
  return aux;
}
