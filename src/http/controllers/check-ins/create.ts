import makeCheckInUseCase from "@/use-cases/factories/make-check-in-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const checkInParamsSchema = z.object({
    gymId: z.string().uuid(),
  });
  const checkInBodySchema = z.object({
    latitude: z.number().refine((v) => v >= -90 && v <= 90),
    longitude: z.number().refine((v) => v >= -180 && v <= 180),
  });

  const { latitude, longitude } = checkInBodySchema.parse(request.body);
  const { gymId } = checkInParamsSchema.parse(request.params);

  const doCheckIn = makeCheckInUseCase();

  const response = await doCheckIn.execute({
    gymId,
    userId: request.user.sub,
    userLatitude: latitude,
    userLongitude: longitude,
  });

  return reply.status(201).send(response);
}
