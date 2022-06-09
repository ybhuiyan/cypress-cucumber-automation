import { Mapper } from '../../shared/services/mapper/mapper';
import { StorefrontProductModel } from '../models/storefront.model';
import { CartProductModel } from '../models/cart-product.model';

export const cartToStorefrontProductMapper: Mapper<
  CartProductModel,
  StorefrontProductModel
> = {
  // id: 'id',
  // price: 'price',
  // itemNumber: 'itemNumber';
  // manufacturerId: number;
  // manufacturerPartNumber: string;
  // primaryCategoryId: number;
  // productStatusId: number;
  // itemName: string;
  // customerNumber: 'id',
  // name: 'userName',
  // slug: (userEntity: ProductModel) =>
  //   userEntity.userName.toLowerCase().replace(/\s/g, '-'),
};

export const storefrontToCartProductMapper: Mapper<
  StorefrontProductModel,
  CartProductModel
> = {
  // id: 'id',
  // price: 'price',
  // itemNumber: 'itemNumber';
  // manufacturerId: number;
  // manufacturerPartNumber: string;
  // primaryCategoryId: number;
  // productStatusId: number;
  // itemName: string;
  // customerNumber: 'id',
  // name: 'userName',
  // slug: (userEntity: ProductModel) =>
  //   userEntity.userName.toLowerCase().replace(/\s/g, '-'),
};
