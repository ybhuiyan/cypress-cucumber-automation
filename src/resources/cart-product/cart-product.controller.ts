import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { CartProductService } from './cart-product.service';
import { CartProductModel } from '../models/cart-product.model';

@Controller('cart-product')
export class CartProductController {
  constructor(private readonly cartProductService: CartProductService) {}

  /**
   * event listener to handle a product being added
   * @param message
   * @param context
   * @returns the added product
   */
  // @MessagePattern(process.env.KAFKA_OUTGOING_STOREFRONT_PRODUCT_TOPIC)
  @MessagePattern('outgoing.storefront.product')
  async handleProductAdded(
    @Payload() message: any,
    @Ctx() context: KafkaContext,
  ) {
    const originalMessage = context.getMessage();

    const incomingBufferString = JSON.stringify(originalMessage.value);

    const inComingProduct: CartProductModel = JSON.parse(incomingBufferString);

    try {
      await this.cartProductService.handleComingProduct(inComingProduct);
    } catch (err) {
      console.error(err);
    }
  }
}
