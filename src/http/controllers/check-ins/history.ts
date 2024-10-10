import makeFetchUserCheckInHistoryUseCase from "@/use-cases/factories/make-fetch-user-check-in-history-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function history(request: FastifyRequest, reply: FastifyReply) {
  const checkInHistorySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  });

  const { page } = checkInHistorySchema.parse(request.query);

  const fetchUserCheckInHistory = makeFetchUserCheckInHistoryUseCase();

  const { history } = await fetchUserCheckInHistory.execute({
    page,
    userId: request.user.sub,
  });

  return reply.status(200).send({ history });
}
