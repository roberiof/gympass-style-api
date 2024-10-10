import PrismaUserRepository from "@/http/repositories/prisma/prisma-user-repository";
import { GetUserProfileUseCase } from "../get-user-profile";

export default function makeGetUserProfileUseCase() {
  const userRepository = new PrismaUserRepository();
  const getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  return getUserProfileUseCase;
}
