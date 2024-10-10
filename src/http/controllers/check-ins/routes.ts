import verifyJwt from "@/http/middlewares/verify-jwt";
import { FastifyInstance } from "fastify";
import { history } from "./history";
import { metrics } from "./metrics";
import { validate } from "./validate";
import { create } from "./create";

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/gyms/:gymId/check-ins", create);

  app.get("/check-ins/history", history);
  app.get("/check-ins/metrics", metrics);

  app.patch("/check-ins/:checkInId/validate", validate);
}
