import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from '../../shared/services/services.module';
import { StorefrontProductResolver } from './storefront-product.resolver';
import { StorefrontProductService } from './storefront-product.service';

describe('StorefrontProductResolver', () => {
  let resolver: StorefrontProductResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServicesModule],
      providers: [StorefrontProductResolver, StorefrontProductService],
    }).compile();

    resolver = module.get<StorefrontProductResolver>(StorefrontProductResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
