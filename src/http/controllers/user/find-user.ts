import { makeFindWithPersonUseCase } from "@/use-cases/factory/make-find-with-person";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findUser(req: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    userId: z.coerce.number(),
  });

  const { userId } = registerParamsSchema.parse(req.params);

  const findWithPersonUseCase = makeFindWithPersonUseCase();

  const user = await findWithPersonUseCase.handler(userId);

  return reply.code(200).send(user);
}
