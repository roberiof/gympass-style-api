import makeCreateGymUseCase from "@/use-cases/factories/make-create-gym-use-case";
import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const gymSchema = z.object({
    name: z.string(),
    phone: z.string().nullable(),
    description: z.string().nullable(),
    latitude: z.number().refine((v) => v >= -90 && v <= 90),
    longitude: z.number().refine((v) => v >= -180 && v <= 180),
  });

  const { name, phone, description, latitude, longitude } = gymSchema.parse(
    request.body,
  );

  const crateGym = makeCreateGymUseCase();

  const response = await crateGym.execute({
    name,
    phone,
    description,
    latitude,
    longitude,
  });

  return reply.status(201).send(response);
}
