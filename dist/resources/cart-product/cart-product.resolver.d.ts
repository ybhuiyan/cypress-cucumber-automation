import { CartProductService } from './cart-product.service';
import { CartProductInput } from './dto/cart-product.input';
export declare class CartProductResolver {
    private readonly productService;
    constructor(productService: CartProductService);
    createProduct(createProductInput: CartProductInput): any;
    findAll(): string;
    findOne(id: number): string;
    updateProduct(updateProductInput: CartProductInput): any;
    removeProduct(id: number): any;
}
