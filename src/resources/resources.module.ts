import { Module } from '@nestjs/common';
import { CartProductModule } from './cart-product/cart-product.module';
import { StorefrontProductModule } from './storefront-product/storefront-product.module';

@Module({
  imports: [CartProductModule, StorefrontProductModule],
})
export class ResourcesModule {}
