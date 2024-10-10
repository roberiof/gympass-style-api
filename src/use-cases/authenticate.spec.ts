import { test, describe, expect, beforeEach } from "vitest";
import InMemoryUsersRepository from "@/http/repositories/in-memory/in-memory-user-repository";
import { AuthenticateUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: AuthenticateUseCase;

describe("Authenticate Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new AuthenticateUseCase(inMemoryUsersRepository);
  });

  test("should be able to authenticate", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "john@email.com",
        password: "123456",
      }),
    ).resolves.toStrictEqual({ user });
  });

  test("should not be able to authenticate with wrong e-mail", async () => {
    await expect(
      sut.execute({
        email: "john123@email.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  test("should not be able to authenticate with wrong password", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(
      sut.execute({
        email: "john123@email.com",
        password: "654321",
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
