import { Test, TestingModule } from '@nestjs/testing';
import { CustomerAddressesController } from './customer_addresses.controller';
import { CustomerAddressesService } from './customer_addresses.service';

describe('CustomerAddressesController', () => {
  let controller: CustomerAddressesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerAddressesController],
      providers: [CustomerAddressesService],
    }).compile();

    controller = module.get<CustomerAddressesController>(CustomerAddressesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
