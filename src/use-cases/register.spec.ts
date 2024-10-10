import { test, describe, expect, beforeEach } from "vitest";
import { RegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import InMemoryUsersRepository from "@/http/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(async () => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new RegisterUseCase(inMemoryUsersRepository);
  });

  test("should be able to register  ", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  test("should hash user password upon registration", async () => {
    const { user } = await sut.execute({
      name: "John Doe",
      email: "john@email.com",
      password: "123456",
    });

    const wasPasswordCorrectlyHashed = await compare(
      "123456",
      user.passwordHash,
    );

    expect(wasPasswordCorrectlyHashed).toBe(true);
  });

  test("should not be able to register with same email twice", async () => {
    const email = "john@email.com";

    await sut.execute({
      name: "John Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "John Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
