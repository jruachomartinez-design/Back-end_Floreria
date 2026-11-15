import { Test, TestingModule } from '@nestjs/testing';
import { ProductFavoritesController } from './product_favorites.controller';
import { ProductFavoritesService } from './product_favorites.service';

describe('ProductFavoritesController', () => {
  let controller: ProductFavoritesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductFavoritesController],
      providers: [ProductFavoritesService],
    }).compile();

    controller = module.get<ProductFavoritesController>(ProductFavoritesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
