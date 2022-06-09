import { Module } from '@nestjs/common';
import { StorefrontProductService } from './storefront-product.service';
import { StorefrontProductResolver } from './storefront-product.resolver';

@Module({
  providers: [StorefrontProductResolver, StorefrontProductService],
})
export class StorefrontProductModule {}
