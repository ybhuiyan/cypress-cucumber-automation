import { Mapper } from '../../shared/services/mapper/mapper';
import { StorefrontProductModel } from '../models/storefront.model';
import { CartProductModel } from '../models/cart-product.model';
export declare const cartToStorefrontProductMapper: Mapper<CartProductModel, StorefrontProductModel>;
export declare const storefrontToCartProductMapper: Mapper<StorefrontProductModel, CartProductModel>;
