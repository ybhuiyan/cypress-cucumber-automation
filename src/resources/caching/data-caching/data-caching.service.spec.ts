import { Test, TestingModule } from '@nestjs/testing';
import { DataCachingService } from './data-caching.service';

describe('DataCachingService', () => {
  let service: DataCachingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataCachingService],
    }).compile();

    service = module.get<DataCachingService>(DataCachingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
