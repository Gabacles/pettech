import { makeFindAddressByPersonUseCase } from "@/use-cases/factory/make-find-adress-by-person-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findAddress(req: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    personId: z.coerce.number(),
  });

  const registerQuerySchema = z.object({
    page: z.coerce.number(),
    limit: z.coerce.number(),
  });

  const { personId } = registerParamsSchema.parse(req.params);
  const { page, limit } = registerQuerySchema.parse(req.query);

  const findAddressByPersonUseCase = makeFindAddressByPersonUseCase();

  const address = await findAddressByPersonUseCase.handler(
    personId,
    page,
    limit
  );

  return reply.status(200).send(address);
}
