import { ICategory } from "@/entities/models/category.interface";
import { IProduct } from "@/entities/models/product.interface";

export interface ICategoryRepository {
  create(name: string, products?: IProduct[]): Promise<ICategory>;
}
