import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { Category } from '../categories/entities/category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, price, stock, image_url, ...rest } = createProductDto;

    if (price < 0 || stock < 0) {
      throw new BadRequestException('Price and stock must be greater than or equal to 0');
    }

    const category = await this.categoryRepository.findOneBy({ id: categoryId });
    if (!category) {
      throw new NotFoundException(`Category with id ${categoryId} not found`);
    }

    const product = this.productRepository.create({
      ...rest,
      image_url: image_url ?? null,
      price: price.toFixed(2),
      stock,
      categoryId,
    });

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: { category: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { categoryId, price, stock, image_url, ...rest } = updateProductDto;

    if (price !== undefined && price < 0) {
      throw new BadRequestException('Price must be greater than or equal to 0');
    }

    if (stock !== undefined && stock < 0) {
      throw new BadRequestException('Stock must be greater than or equal to 0');
    }

    if (categoryId !== undefined) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (!category) {
        throw new NotFoundException(`Category with id ${categoryId} not found`);
      }
    }

    const product = await this.productRepository.preload({
      id,
      ...rest,
      ...(categoryId !== undefined && { categoryId }),
      ...(image_url !== undefined && { image_url: image_url }),
      ...(price !== undefined && { price: price.toFixed(2) }),
      ...(stock !== undefined && { stock }),
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}