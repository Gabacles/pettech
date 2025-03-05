import { makeUpdateProductUseCase } from "@/use-cases/factory/make-update-product-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function update(req: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    id: z.coerce.string(),
  });

  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image_url: z.string(),
    price: z.coerce.number(),
    categories: z
      .array(
        z.object({
          id: z.coerce.number().optional(),
          name: z.string(),
        })
      )
      .optional(),
  });

  const { id } = registerParamsSchema.parse(req.params);
  const { name, description, image_url, price, categories } =
    registerBodySchema.parse(req.body);

  const updateProductUseCase = makeUpdateProductUseCase();

  const product = await updateProductUseCase.handler({
    id,
    name,
    description,
    image_url,
    price,
    categories,
  });

  reply.code(200).send(product);
}
