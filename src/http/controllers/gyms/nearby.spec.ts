import app from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";
import { createAndAuthenticateUser } from "@/utils/test/craete-and-authenticate-user";

describe("Nearby Gyms", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test("should be able to get nearby gyms", async () => {
    const { token } = await createAndAuthenticateUser(app, true);

    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gym 1",
        address: "Street 1",
        phone: "999999999",
        description: "Description",
        latitude: -8.0248832,
        longitude: -34.9405184,
      });
    await request(app.server)
      .post("/gyms")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Gym 2",
        address: "Street 2",
        phone: "999999999",
        description: "Description",
        latitude: -1.0248832,
        longitude: -24.9405184,
      });

    const response = await request(app.server)
      .get("/gyms/nearby")
      .set("Authorization", `Bearer ${token}`)
      .query({
        latitude: -8.0248832,
        longitude: -34.9405184,
      })
      .send();

    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ name: "Gym 1" }),
    ]);
  });
});
