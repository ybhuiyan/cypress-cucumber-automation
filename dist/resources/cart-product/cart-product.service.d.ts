import { CartProductModel } from '../models/cart-product.model';
import { MapService } from '../../shared/services/mapping/map.service';
import { StorefrontProductService } from '../storefront-product/storefront-product.service';
import { ProductStorefrontMappingService } from '../product-mapping/product-storefront-mapping.service';
export declare class CartProductService {
    private mapService;
    private storefrontProductService;
    private productStorefrontMappingService;
    [x: string]: any;
    constructor(mapService: MapService, storefrontProductService: StorefrontProductService, productStorefrontMappingService: ProductStorefrontMappingService);
    handleComingProduct(cartProduct: CartProductModel): Promise<void>;
    private convertProduct;
    private flatProduct;
}
