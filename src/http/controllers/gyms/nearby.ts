import makeFetchNearbyGymUseCase from "@/use-cases/factories/make-fetch-nearby-gym-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function nearby(request: FastifyRequest, reply: FastifyReply) {
  const searchQuerySchema = z.object({
    latitude: z.coerce.number().refine((v) => v >= -90 && v <= 90),
    longitude: z.coerce.number().refine((v) => v >= -180 && v <= 180),
  });

  const { latitude, longitude } = searchQuerySchema.parse(request.query);

  const fetchNearbyGyms = makeFetchNearbyGymUseCase();

  const { gyms } = await fetchNearbyGyms.execute({
    userLongitude: longitude,
    userLatitude: latitude,
  });

  return reply.status(201).send({ gyms });
}
