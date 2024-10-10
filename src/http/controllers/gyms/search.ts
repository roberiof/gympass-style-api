import makeSearchGymsUseCase from "@/use-cases/factories/make-search-gyms-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function search(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    query: z.string(),
    page: z.coerce.number().min(1).default(1),
  });

  const { query, page } = searchQuerySchema.parse(request.query);

  const searchGyms = makeSearchGymsUseCase();

  const { gyms } = await searchGyms.execute({ page, query });

  return reply.status(201).send({ gyms });
}
