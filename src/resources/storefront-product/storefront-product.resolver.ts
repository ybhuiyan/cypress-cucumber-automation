import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StorefrontProductService } from './storefront-product.service';
import { StorefrontProduct } from './entities/storefrontProduct.entity';
import { StorefrontProductInput } from './dto/storefront-product.input';
import { StorefrontProductModel } from '../models/storefront.model';

@Resolver(() => StorefrontProduct)
export class StorefrontProductResolver {
  constructor(
    private readonly productStorefrontService: StorefrontProductService,
  ) {}

  @Query(() => [StorefrontProduct], { name: 'storefrontProductList' })
  findAll() {
    return 'this.productStorefrontService.findAll()';
    // return this.productStorefrontService.findAll();
  }

  @Query(() => StorefrontProduct, { name: 'storefrontProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return 'this.productStorefrontService.findOne(id)';
    // return this.productStorefrontService.findOne(id);
  }
}
