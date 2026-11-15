import { Test, TestingModule } from '@nestjs/testing';
import { ProductFavoritesService } from './product_favorites.service';

describe('ProductFavoritesService', () => {
  let service: ProductFavoritesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductFavoritesService],
    }).compile();

    service = module.get<ProductFavoritesService>(ProductFavoritesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
