import { makeDeleteProductUseCase } from "@/use-cases/factory/make-delete-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function deleteProduct(req: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  });

  const { id } = registerParamsSchema.parse(req.params);

  const deleteProductUseCase = makeDeleteProductUseCase();

  await deleteProductUseCase.handler(id);

  reply.code(204).send();
}
