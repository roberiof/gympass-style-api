import request from "supertest";
import { FastifyInstance } from "fastify";
import { hash } from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createAndAuthenticateUser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@gmail.com",
      passwordHash: await hash("123456", 6),
      role: isAdmin ? "ADMIN" : "MEMBER",
    },
  });
  const authenticateResponse = await request(app.server)
    .post("/sessions")
    .send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

  const { token } = authenticateResponse.body;

  return {
    token,
  };
}
