import { Category } from "@/entities/category.entity";
import { Product } from "@/entities/product.entity";
import { env } from "@/env";

import { DataSource } from "typeorm";
import { ProductAutoGenerateUUID1714090143497 } from "./migrations/1741104940378-ProductAutoGenerateUUID";

export const appDataSource = new DataSource({
  type: "postgres",
  host: env.DATABASE_HOST,
  port: env.DATABASE_PORT,
  username: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
  entities: [Product, Category],
  migrations: [ProductAutoGenerateUUID1714090143497],
  logging: env.NODE_ENV === "development",
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error("Database connection error", error);
  });
