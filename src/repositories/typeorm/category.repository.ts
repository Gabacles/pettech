import { Repository } from "typeorm";
import { ICategoryRepository } from "../category.repository.interface";
import { Category } from "@/entities/category.entity";
import { appDataSource } from "@/lib/typeorm/typeorm";

export class CategoryRepository implements ICategoryRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  async create(name: string): Promise<Category> {
    return await this.repository.save({ name });
  }
}
