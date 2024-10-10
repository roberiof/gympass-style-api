import PrismaUserRepository from "@/http/repositories/prisma/prisma-user-repository";
import { RegisterUseCase } from "../register";

export default function makeRegisterUseCase() {
  const userRepository = new PrismaUserRepository();
  const registerUseCase = new RegisterUseCase(userRepository);
  return registerUseCase;
}
