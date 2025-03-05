import { makeFindProductUseCase } from "@/use-cases/factory/make-find-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findProduct(req: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const findProductUseCase = makeFindProductUseCase();

  const product = await findProductUseCase.handler(id);

  reply.code(200).send(product);
}
