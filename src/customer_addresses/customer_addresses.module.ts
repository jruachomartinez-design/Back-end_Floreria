import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressesService } from './customer_addresses.service';
import { CustomerAddressesController } from './customer_addresses.controller';
import { CustomerAddress } from './entities/customer_address.entity';
import { Address } from '../addresses/entities/address.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress, User, Address])],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
  exports: [CustomerAddressesService],
})
export class CustomerAddressesModule {}
