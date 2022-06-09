import { Injectable } from '@nestjs/common';
import { CartProductModel, ProductType } from '../models/cart-product.model';
import { ProductFlatModel } from '../models/product-flat.model';
import { MapService } from '../../shared/services/mapping/map.service';
import { StorefrontProductModel } from '../models/storefront.model';
import { StorefrontProductService } from '../storefront-product/storefront-product.service';
import { ProductStorefrontMappingService } from '../product-mapping/product-storefront-mapping.service';

@Injectable()
export class CartProductService {
  [x: string]: any;
  constructor(
    private mapService: MapService,
    private storefrontProductService: StorefrontProductService,
    private productStorefrontMappingService: ProductStorefrontMappingService,
  ) {}

  async handleComingProduct(cartProduct: CartProductModel) {
    // This storefront integration service ONLY need to process AutoAnything products
    // The organization ID is assgined at data source (ETL integration service)
    // This service need to set it in .env file
    // const AA_ORG_ID = Number(process.env.AUTOANYTHING_ORGANIZATION_ID);
    // console.log(AA_ORG_ID);

    const AA_ORG_ID = 1337;
    if (cartProduct.organizationId === AA_ORG_ID) {
      console.log(
        'Product from Product service: ' +
          JSON.stringify(cartProduct).substring(0, 1000),
      );
      try {
        const storefrontProducts = await this.convertProduct(cartProduct);
        // console.log('storefrontProducts', storefrontProducts);

        if (storefrontProducts.length > 0) {
          for (const storefrontProduct of storefrontProducts) {
            await this.storefrontProductService.create(storefrontProduct);
          }
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  private async convertProduct(
    cartProduct: CartProductModel,
  ): Promise<StorefrontProductModel[]> {
    try {
      const flatProducts: ProductFlatModel[] = await this.flatProduct(
        cartProduct,
      );

      const storefrontProducts: StorefrontProductModel[] = [];

      for (const flatProduct of flatProducts) {
        const storefrontProduct =
          await this.productStorefrontMappingService.convertToStorefrontProduct(
            flatProduct,
          );

        storefrontProducts.push(storefrontProduct);
      }

      return storefrontProducts;
    } catch (err) {
      console.error(err);
    }
  }

  private async flatProduct(
    cartProduct: CartProductModel,
  ): Promise<ProductFlatModel[]> {
    const flats = cartProduct.productVariants.map((variant) => {
      const flat: ProductFlatModel = {
        cartProductId: cartProduct.id,
        organizationId: cartProduct.organizationId,
        externalProductId: cartProduct.externalProductId,
        name: cartProduct.name,
        extUpdateDate: cartProduct.externalUpdatedDate.toString(),
        type: cartProduct.type,
        descriptions: cartProduct.descriptions,
        price: cartProduct.price,
        productVariantId: variant.id,
        productVariantName: variant.name,
        sku: variant.sku,
        productVariantType: variant.type,
        version: variant.version,
        productVariantAttributes: variant.productVariantAttributes,
        categories: cartProduct.categories,
        media: variant.media,
        isKit: variant.type == ProductType.BUNDLE ? true : false,
      };
      return flat;
    });
    return flats;
  }
}
