import { makeCreateCategoryUseCase } from "@/use-cases/factory/make-create-category-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
  });

  const { name } = registerBodySchema.parse(req.body);

  const createCategoryUseCase = makeCreateCategoryUseCase();

  const category = await createCategoryUseCase.handler(name);

  reply.code(201).send(category);
}
