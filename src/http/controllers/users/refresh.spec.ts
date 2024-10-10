import app from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";

describe("Refresh token", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test("should be able to refresh a token", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const authResponse = await request(app.server).post("/sessions").send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    const cookies = authResponse.get("Set-Cookie") as string[];

    const response = await request(app.server)
      .patch("/token/refresh")
      .set("Cookie", cookies)
      .send();

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.get("Set-Cookie")).toEqual([
      expect.stringContaining("refreshToken="),
    ]);
  });
});
