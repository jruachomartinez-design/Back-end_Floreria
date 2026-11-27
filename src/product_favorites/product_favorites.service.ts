import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductFavorite } from './entities/product_favorite.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { CreateProductFavoriteDto } from './dto/create-product_favorite.dto';
import { UpdateProductFavoriteDto } from './dto/update-product_favorite.dto';

@Injectable()
export class ProductFavoritesService {
  constructor(
    @InjectRepository(ProductFavorite)
    private readonly productFavoriteRepository: Repository<ProductFavorite>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    createProductFavoriteDto: CreateProductFavoriteDto,
  ): Promise<ProductFavorite> {
    const { userId, productId } = createProductFavoriteDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const existingFavorite = await this.productFavoriteRepository.findOneBy({
      userId,
      productId,
    });
    if (existingFavorite) {
      throw new ConflictException(
        `Product ${productId} is already in favorites for user ${userId}`,
      );
    }

    const favorite = this.productFavoriteRepository.create({
      userId,
      productId,
    });

    return this.productFavoriteRepository.save(favorite);
  }

  async findAll(): Promise<ProductFavorite[]> {
    return this.productFavoriteRepository.find({
      relations: {
        user: true,
        product: true,
      },
      order: { id: 'ASC' },
    });
  }

  async findByUser(userId: number): Promise<ProductFavorite[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.productFavoriteRepository.find({
      where: { userId },
      relations: { product: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<ProductFavorite> {
    const favorite = await this.productFavoriteRepository.findOne({
      where: { id },
      relations: {
        user: true,
        product: true,
      },
    });
    if (!favorite) {
      throw new NotFoundException(`ProductFavorite with id ${id} not found`);
    }
    return favorite;
  }

  async update(
    id: number,
    updateProductFavoriteDto: UpdateProductFavoriteDto,
  ): Promise<ProductFavorite> {
    const existing = await this.findOne(id);

    const nextUserId = updateProductFavoriteDto.userId ?? existing.userId;
    const nextProductId =
      updateProductFavoriteDto.productId ?? existing.productId;

    if (updateProductFavoriteDto.userId !== undefined) {
      const user = await this.userRepository.findOneBy({ id: nextUserId });
      if (!user) {
        throw new NotFoundException(`User with id ${nextUserId} not found`);
      }
    }

    if (updateProductFavoriteDto.productId !== undefined) {
      const product = await this.productRepository.findOneBy({
        id: nextProductId,
      });
      if (!product) {
        throw new NotFoundException(
          `Product with id ${nextProductId} not found`,
        );
      }
    }

    if (nextUserId !== existing.userId || nextProductId !== existing.productId) {
      const duplicatePair = await this.productFavoriteRepository.findOneBy({
        userId: nextUserId,
        productId: nextProductId,
      });
      if (duplicatePair) {
        throw new ConflictException(
          `Product ${nextProductId} is already in favorites for user ${nextUserId}`,
        );
      }
    }

    const favorite = await this.productFavoriteRepository.preload({
      id,
      userId: nextUserId,
      productId: nextProductId,
    });

    if (!favorite) {
      throw new NotFoundException(`ProductFavorite with id ${id} not found`);
    }

    return this.productFavoriteRepository.save(favorite);
  }

  async remove(id: number): Promise<void> {
    const favorite = await this.findOne(id);
    await this.productFavoriteRepository.remove(favorite);
  }
}