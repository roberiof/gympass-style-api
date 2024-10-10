import app from "@/app";
import { describe } from "node:test";
import { afterAll, beforeAll, expect, test } from "vitest";
import request from "supertest";

describe("Authenticate User", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });

  test("should be able to authenticate", async () => {
    await request(app.server).post("/users").send({
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "123456",
    });
    const response = await request(app.server).post("/sessions").send({
      email: "johndoe@gmail.com",
      password: "123456",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
});
