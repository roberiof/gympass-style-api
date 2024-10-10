import app from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";

describe("User Profile", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test("should be able to get profile", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const authenticationResponse = await request(app.server)
      .post("/sessions")
      .send({
        email: "johndoe@gmail.com",
        password: "123456",
      });

    const response = await request(app.server)
      .get("/profile")
      .set("Authorization", `Bearer ${authenticationResponse.body.token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.user).toEqual(
      expect.objectContaining({
        email: "johndoe@gmail.com",
      }),
    );
  });
});
