import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomerAddress } from './entities/customer_address.entity';
import { User } from '../users/entities/user.entity';
import { Address } from '../addresses/entities/address.entity';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';


@Injectable()
export class CustomerAddressesService {
  constructor(
    @InjectRepository(CustomerAddress)
    private readonly customerAddressRepository: Repository<CustomerAddress>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(
    createCustomerAddressDto: CreateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const { userId, addressId } = createCustomerAddressDto;

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const address = await this.addressRepository.findOneBy({ id: addressId });
    if (!address) {
      throw new NotFoundException(`Address with id ${addressId} not found`);
    }

    const existingRelation = await this.customerAddressRepository.findOne({
      where: {
        user: { id: userId },
        address: { id: addressId },
      },
    });
    if (existingRelation) {
      throw new ConflictException(
        `Customer ${userId} already has address ${addressId} assigned`,
      );
    }

    const customerAddress = this.customerAddressRepository.create({
      user,
      address,
    });

    return this.customerAddressRepository.save(customerAddress);
  }

  async findAll(): Promise<CustomerAddress[]> {
    return this.customerAddressRepository.find({
      relations: {
        user: true,
        address: true,
      },
      order: { id: 'ASC' },
    });
  }

  async findOne(id: number): Promise<CustomerAddress> {
    const customerAddress = await this.customerAddressRepository.findOne({
      where: { id },
      relations: {
        user: true,
        address: true,
      },
    });
    if (!customerAddress) {
      throw new NotFoundException(`CustomerAddress with id ${id} not found`);
    }
    return customerAddress;
  }

  async update(
    id: number,
    updateCustomerAddressDto: UpdateCustomerAddressDto,
  ): Promise<CustomerAddress> {
    const customerAddress = await this.findOne(id);

    if (updateCustomerAddressDto.userId !== undefined) {
      const user = await this.userRepository.findOneBy({
        id: updateCustomerAddressDto.userId,
      });
      if (!user) {
        throw new NotFoundException(
          `User with id ${updateCustomerAddressDto.userId} not found`,
        );
      }
      customerAddress.user = user;
    }

    if (updateCustomerAddressDto.addressId !== undefined) {
      const address = await this.addressRepository.findOneBy({
        id: updateCustomerAddressDto.addressId,
      });
      if (!address) {
        throw new NotFoundException(
          `Address with id ${updateCustomerAddressDto.addressId} not found`,
        );
      }
      customerAddress.address = address;
    }

    return this.customerAddressRepository.save(customerAddress);
  }

  async remove(id: number): Promise<void> {
    const customerAddress = await this.findOne(id);
    await this.customerAddressRepository.remove(customerAddress);
  }
}