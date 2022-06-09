import { Test, TestingModule } from '@nestjs/testing';
import { ServicesModule } from '../../shared/services/services.module';
import { StorefrontProductService } from './storefront-product.service';
// import { CreateStorefrontProductInput } from './dto/create-product.input';

describe('StorefrontProductService', () => {
  let service: StorefrontProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ServicesModule],
      providers: [StorefrontProductService],
    }).compile();

    service = module.get<StorefrontProductService>(StorefrontProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should call create product and return something', () => {
  //   const createStorefrontProductInput: CreateStorefrontProductInput = {
  //     id: 1,
  //     itemNumber: '',
  //     manufacturerId: 0,
  //     manufacturerPartNumber: '',
  //     primaryCategoryId: 0,
  //     productStatusId: 0,
  //     itemName: '',
  //   };

  //   service.create(createStorefrontProductInput);
  //   expect(service).toBeDefined();
  // });
});
