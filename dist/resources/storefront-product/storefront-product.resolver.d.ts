import { StorefrontProductService } from './storefront-product.service';
export declare class StorefrontProductResolver {
    private readonly productStorefrontService;
    constructor(productStorefrontService: StorefrontProductService);
    findAll(): string;
    findOne(id: number): string;
}
