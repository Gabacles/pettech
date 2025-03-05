import { IProductRepository } from "@/repositories/product.repository.interface";

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async handler(id: string) {
    return await this.productRepository.delete(id);
  }
}
