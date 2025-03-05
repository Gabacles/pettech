import { invalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { env } from "process";
import { ZodError } from "zod";

interface ErrorHandlerMap {
  [key: string]: (
    error: ZodError | ResourceNotFoundError,
    request: FastifyRequest,
    reply: FastifyReply
  ) => void;
}

export const errorHandlerMap: ErrorHandlerMap = {
  ResourceNotFoundError: (error, _, reply) => {
    reply.status(404).send({ message: error.message });
  },
  ZodError: (error, _, reply) => {
    reply.status(400).send({
      message: "Validation error",
      ...(error instanceof ZodError && { errors: error.format() }),
    });
  },
  invalidCredentialsError: (error, _, reply) => {
    reply.status(404).send({ message: error.message });
  },
};

export function globalErrorHandler(
  error: Error | ZodError | ResourceNotFoundError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  if (env.NODE_ENV === "development") console.error(error);

  const errorName = error.constructor.name;

  const handler = errorHandlerMap[errorName];

  if (handler) return handler(error, request, reply);

  return reply.status(500).send({ message: "Internal server error" });
}
