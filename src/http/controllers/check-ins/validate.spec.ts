import app from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/craete-and-authenticate-user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Validate Check-in", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test("should be able to validate check-in", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    const responseGym = await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gym 1",
        phone: "999999999",
        description: "Description",
        latitude: -8.0248832,
        longitude: -34.9405184,
      });

    const gym = responseGym.body.gym;

    const responseCheckIn = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -8.0248832,
        longitude: -34.9405184,
      });

    let checkIn = responseCheckIn.body.checkIn;

    const response = await request(app.server)
      .patch(`/check-ins/${checkIn.id}/validate`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toBe(204);

    checkIn = await prisma.checkIn.findFirstOrThrow({
      where: {
        id: checkIn.id,
      },
    });

    expect(checkIn.validatedAt).not.toBeNull();
  });
});
