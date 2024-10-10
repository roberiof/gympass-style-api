import app from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/craete-and-authenticate-user";

describe("Create Check-in", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test("should be able to create check-in", async () => {
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

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -8.0248832,
        longitude: -34.9405184,
      });

    expect(response.statusCode).toBe(201);
  });
});
