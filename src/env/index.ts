import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("production"),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
});

const res = envSchema.safeParse(process.env);

if (!res.success) {
  console.error("Error while validating .env", res.error.format());
  throw new Error("Error while validating .env");
}

export default res.data;
