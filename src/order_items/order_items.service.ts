import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { OrderItem } from './entities/order_item.entity';
import { Order } from '../orders/entities/order.entity';
import { Product } from '../products/entities/product.entity';
import { CreateOrderItemDto } from './dto/create-order_item.dto';
import { UpdateOrderItemDto } from './dto/update-order_item.dto';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    private readonly dataSource: DataSource,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const { orderId, productId, quantity, unit_price } = createOrderItemDto;

    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    if (unit_price < 0) {
      throw new BadRequestException('Unit price must be greater than or equal to 0');
    }

    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOneBy(Order, { id: orderId });
      if (!order) {
        throw new NotFoundException(`Order with id ${orderId} not found`);
      }

      const product = await manager.findOneBy(Product, { id: productId });
      if (!product) {
        throw new NotFoundException(`Product with id ${productId} not found`);
      }

      if (!product.is_active) {
        throw new BadRequestException(`Product "${product.name}" is not active`);
      }

      const existingItem = await manager.findOneBy(OrderItem, {
        orderId,
        productId,
      });
      if (existingItem) {
        throw new ConflictException(
          `Product ${productId} is already in order ${orderId}`,
        );
      }

      if (product.stock < quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        );
      }

      product.stock -= quantity;
      await manager.save(Product, product);

      const orderItem = manager.create(OrderItem, {
        orderId,
        productId,
        quantity,
        unit_price: unit_price.toFixed(2),
      });

      return manager.save(OrderItem, orderItem);
    });
  }

  async findAll(): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      relations: {
        order: true,
        product: true,
      },
      order: { id: 'ASC' },
    });
  }

  async findByOrder(orderId: number): Promise<OrderItem[]> {
    return this.orderItemRepository.find({
      where: { orderId },
      relations: { product: true },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<OrderItem> {
    const orderItem = await this.orderItemRepository.findOne({
      where: { id },
      relations: {
        order: true,
        product: true,
      },
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with id ${id} not found`);
    }
    return orderItem;
  }

  async update(
    id: number,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    if (
      updateOrderItemDto.quantity !== undefined &&
      updateOrderItemDto.quantity <= 0
    ) {
      throw new BadRequestException('Quantity must be greater than 0');
    }

    if (
      updateOrderItemDto.unit_price !== undefined &&
      updateOrderItemDto.unit_price < 0
    ) {
      throw new BadRequestException(
        'Unit price must be greater than or equal to 0',
      );
    }

    return this.dataSource.transaction(async (manager) => {
      const existingItem = await manager.findOneBy(OrderItem, { id });
      if (!existingItem) {
        throw new NotFoundException(`OrderItem with id ${id} not found`);
      }

      if (
        updateOrderItemDto.quantity !== undefined &&
        updateOrderItemDto.quantity !== existingItem.quantity
      ) {
        const product = await manager.findOneBy(Product, {
          id: existingItem.productId,
        });
        if (!product) {
          throw new NotFoundException(
            `Product with id ${existingItem.productId} not found`,
          );
        }

        const diff = updateOrderItemDto.quantity - existingItem.quantity;
        if (diff > 0 && product.stock < diff) {
          throw new BadRequestException(
            `Insufficient stock for "${product.name}". Available: ${product.stock}`,
          );
        }

        product.stock -= diff;
        await manager.save(Product, product);
        existingItem.quantity = updateOrderItemDto.quantity;
      }

      if (updateOrderItemDto.unit_price !== undefined) {
        existingItem.unit_price = updateOrderItemDto.unit_price.toFixed(2);
      }

      return manager.save(OrderItem, existingItem);
    });
  }

  async remove(id: number): Promise<void> {
    await this.dataSource.transaction(async (manager) => {
      const existingItem = await manager.findOneBy(OrderItem, { id });
      if (!existingItem) {
        throw new NotFoundException(`OrderItem with id ${id} not found`);
      }

      const product = await manager.findOneBy(Product, {
        id: existingItem.productId,
      });
      if (product) {
        product.stock += existingItem.quantity;
        await manager.save(Product, product);
      }

      await manager.remove(OrderItem, existingItem);
    });
  }
}