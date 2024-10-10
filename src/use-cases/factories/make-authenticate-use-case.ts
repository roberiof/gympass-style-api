import PrismaUserRepository from "@/http/repositories/prisma/prisma-user-repository";
import { AuthenticateUseCase } from "../authenticate";

export default function makeAuthenticateUseCase() {
  const userRepository = new PrismaUserRepository();
  const authenticateUseCase = new AuthenticateUseCase(userRepository);
  return authenticateUseCase;
}
