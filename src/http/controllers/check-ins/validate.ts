import makeValidateCheckInUseCase from "@/use-cases/factories/make-validate-check-in-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  });

  const { checkInId } = validateCheckInParamsSchema.parse(request.params);

  const validateCheckIn = makeValidateCheckInUseCase();

  await validateCheckIn.execute({
    checkInId,
  });

  return reply.status(204).send();
}
