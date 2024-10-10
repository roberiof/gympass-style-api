import { UserAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import makeRegisterUseCase from "@/use-cases/factories/make-register-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerUserSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { name, email, password } = registerUserSchema.parse(request.body);

  try {
    const registerUseCase = makeRegisterUseCase();
    await registerUseCase.execute({ name, email, password });
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message });
    }
    throw err;
  }

  return reply.status(201).send();
}
