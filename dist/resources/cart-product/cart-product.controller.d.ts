import { KafkaContext } from '@nestjs/microservices';
import { CartProductService } from './cart-product.service';
export declare class CartProductController {
    private readonly cartProductService;
    constructor(cartProductService: CartProductService);
    handleProductAdded(message: any, context: KafkaContext): Promise<void>;
}
