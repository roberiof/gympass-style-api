import { test, describe, beforeEach, expect } from "vitest";
import InMemoryUsersRepository from "@/http/repositories/in-memory/in-memory-user-repository";
import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "./get-user-profile";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let inMemoryUsersRepository: InMemoryUsersRepository;
let sut: GetUserProfileUseCase;

describe("Get user profile use case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    sut = new GetUserProfileUseCase(inMemoryUsersRepository);
  });

  test("should be able to get user", async () => {
    const user = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(sut.execute({ userId: user.id })).resolves.toStrictEqual({
      user,
    });
  });

  test("should not be able to get user if id doesn't exists", async () => {
    await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "john@email.com",
      passwordHash: await hash("123456", 6),
    });

    await expect(sut.execute({ userId: "wrong-id" })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    );
  });
});
