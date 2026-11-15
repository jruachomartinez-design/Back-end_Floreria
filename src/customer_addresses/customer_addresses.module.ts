import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerAddressesService } from './customer_addresses.service';
import { CustomerAddressesController } from './customer_addresses.controller';
import { CustomerAddress } from './entities/customer_address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerAddress])],
  controllers: [CustomerAddressesController],
  providers: [CustomerAddressesService],
})
export class CustomerAddressesModule {}
