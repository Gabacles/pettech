import { makeCreatePersonUseCase } from "@/use-cases/factory/make-create-person-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    cpf: z.string(),
    email: z.string().email(),
    birth: z.coerce.date(),
    user_id: z.coerce.number(),
  });

  const { name, cpf, email, birth, user_id } = registerBodySchema.parse(
    req.body
  );

  const createPersonUseCase = makeCreatePersonUseCase();

  const person = await createPersonUseCase.handler({
    name,
    cpf,
    email,
    birth,
    user_id,
  });

  return reply.status(201).send(person);
}
