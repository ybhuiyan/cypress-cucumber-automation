import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartProductService } from './cart-product.service';
import { CartProduct } from './entities/cart-product.entity';
import { CartProductInput } from './dto/cart-product.input';

@Resolver(() => CartProduct)
export class CartProductResolver {
  constructor(private readonly productService: CartProductService) {}

  @Mutation(() => CartProduct)
  createProduct(
    @Args('cartProductInput') createProductInput: CartProductInput,
  ) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [CartProduct], { name: 'cartProductList' })
  findAll() {
    return 'this.productService.findAll()';
    // return this.productService.findAll();
  }

  @Query(() => CartProduct, { name: 'cartProduct' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return 'this.productService.findOne(id)';
    // return this.productService.findOne(id);
  }

  @Mutation(() => CartProduct)
  updateProduct(
    @Args('cartProductInput') updateProductInput: CartProductInput,
  ) {
    return this.productService.update(
      updateProductInput.id,
      updateProductInput,
    );
  }

  @Mutation(() => CartProduct)
  removeProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}
