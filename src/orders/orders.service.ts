import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { CustomerAddress } from '../customer_addresses/entities/customer_address.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

const VALID_ORDER_STATUSES = ['reserved', 'paid', 'fulfilled'] as const;

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CustomerAddress)
    private readonly customerAddressRepository: Repository<CustomerAddress>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { userId, customerAddressId, status, ...rest } = createOrderDto;

    if (
      status &&
      !VALID_ORDER_STATUSES.includes(
        status as (typeof VALID_ORDER_STATUSES)[number],
      )
    ) {
      throw new BadRequestException(
        `Invalid status. Allowed values: ${VALID_ORDER_STATUSES.join(', ')}`,
      );
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    if (customerAddressId !== undefined && customerAddressId !== null) {
      const customerAddress = await this.customerAddressRepository.findOne({
        where: { id: customerAddressId },
        relations: { user: true },
      });
      if (!customerAddress) {
        throw new NotFoundException(
          `CustomerAddress with id ${customerAddressId} not found`,
        );
      }
      if (customerAddress.user?.id !== userId) {
        throw new BadRequestException(
          `CustomerAddress ${customerAddressId} does not belong to user ${userId}`,
        );
      }
    }

    const order = this.orderRepository.create({
      ...rest,
      status: status ?? 'reserved',
      userId,
      customerAddressId: customerAddressId ?? null,
    });

    return this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: {
        user: true,
        customer_address: true,
        order_items: true,
      },
      order: { id: 'ASC' },
    });
  }

  async findByUser(userId: number): Promise<Order[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return this.orderRepository.find({
      where: { userId },
      relations: {
        customer_address: true,
        order_items: true,
      },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        user: true,
        customer_address: true,
        order_items: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const existing = await this.findOne(id);
    const { userId, customerAddressId, status, ...rest } = updateOrderDto;

    if (
      status !== undefined &&
      !VALID_ORDER_STATUSES.includes(
        status as (typeof VALID_ORDER_STATUSES)[number],
      )
    ) {
      throw new BadRequestException(
        `Invalid status. Allowed values: ${VALID_ORDER_STATUSES.join(', ')}`,
      );
    }

    const targetUserId = userId ?? existing.userId;

    if (userId !== undefined) {
      const user = await this.userRepository.findOneBy({ id: userId });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
    }

    if (customerAddressId !== undefined && customerAddressId !== null) {
      const customerAddress = await this.customerAddressRepository.findOne({
        where: { id: customerAddressId },
        relations: { user: true },
      });
      if (!customerAddress) {
        throw new NotFoundException(
          `CustomerAddress with id ${customerAddressId} not found`,
        );
      }
      if (customerAddress.user?.id !== targetUserId) {
        throw new BadRequestException(
          `CustomerAddress ${customerAddressId} does not belong to user ${targetUserId}`,
        );
      }
    }

    const order = await this.orderRepository.preload({
      id,
      ...rest,
      ...(status !== undefined && { status }),
      ...(userId !== undefined && { userId }),
      ...(customerAddressId !== undefined && { customerAddressId }),
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }
}