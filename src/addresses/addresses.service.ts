import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; 
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}
  
  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const existingAddress = await this.addressRepository.findOneBy({
      street: createAddressDto.street,
      number: createAddressDto.number,
      neighborhood: createAddressDto.neighborhood,
      city: createAddressDto.city,
    });
    if(existingAddress) {
      throw new ConflictException(`Address with street ${createAddressDto.street} already exists`);
    }

    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find({
      order: {id: 'ASC'},
    });
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException(`Address with id ${id} not found`);
    }
    return address;
  }

  async update(id: number, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.addressRepository.preload({
        id,
        ...updateAddressDto,
      });
      if (!address) {
        throw new NotFoundException(`Address with id ${id} not found`);
      }
      return this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
