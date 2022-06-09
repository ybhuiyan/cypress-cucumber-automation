import { StorefrontProductPictureModel } from './../models/storefront.model';
import { Injectable } from '@nestjs/common';
import {
  CartProductVariantAttributeValue,
  Category,
} from '../models/cart-product.model';
import { ProductFlatModel } from '../models/product-flat.model';
import {
  StorefrontAttributeGroupModel,
  StorefrontAttributeModel,
  StorefrontProductAttributeModel,
  StorefrontProductModel,
  StorefrontProductCategoriesModel,
  StorefrontCategoryModel,
  StorefrontManufacturerModel,
  GroupAttributeModel,
} from '../models/storefront.model';
import { StorefrontProductService } from '../storefront-product/storefront-product.service';

@Injectable()
export class ProductStorefrontMappingService {
  constructor(private storefrontProductService: StorefrontProductService) {}
  MANUFACTURERTOKEN = 'product_manufacturer';

  async convertToStorefrontProduct(
    flatProduct: ProductFlatModel,
  ): Promise<StorefrontProductModel> {
    const manufacturerName = this.getManufacturerName(
      flatProduct.productVariantAttributes,
    );
    const productPictureList = this.getProductPictures(flatProduct);

    const productStatusList = this.getProductStatusFromStorefront();
    const attributeGroups = this.convertToStorefrontProductAttributeGroups(
      flatProduct.productVariantAttributes,
    );
    const categories = this.convertToStorefrontCategories(
      flatProduct.categories,
    );
    const manufacturer =
      this.getOrCreateStorefrontManufacturer(manufacturerName);

    console.log('Before coverting...');

    let productStatusId: number;
    let categoryId: number;
    let attributeGroupResult: GroupAttributeModel[];
    let manufacturerResult;
    let categoriesResult;
    await Promise.all([
      productStatusList,
      attributeGroups,
      categories,
      manufacturer,
    ]).then(
      ([
        productStatusResponse,
        attributeGroupsResponse,
        categoriesResponse,
        manufacturerResponse,
      ]) => {
        attributeGroupResult = attributeGroupsResponse;
        // To send product over storefront, we need to set the productStatus with default value
        // Suggested from storefront, we just need to (I'd just set it to be the available status. using the first status that has isUnavailable = false)
        // The getProductStatusFromStorefront GraphQL query already contains isUnavailable = false
        productStatusId = productStatusResponse[0].id;
        // For AutoAnything, the product only has one category and is flat
        categoryId = categoriesResponse[0].id;
        manufacturerResult = manufacturerResponse;
        categoriesResult = categoriesResponse;
      },
    );
    console.log('After product properties converting...');

    const attributesResult = await this.convertToStorefrontProductAttributes(
      attributeGroupResult,
    );

    const storeProduct = await this.buildStorefrontProduct(
      flatProduct,
      productStatusId,
      manufacturerResult,
      categoryId,
      categoriesResult,
      attributesResult,
      productPictureList,
    );
    console.log('storeProduct', storeProduct);

    return storeProduct;
  }

  getProductPictures(
    flatProduct: ProductFlatModel,
  ): StorefrontProductPictureModel[] {
    const productPictures: StorefrontProductPictureModel[] = [];
    for (const media of flatProduct.media) {
      const productMedia = {
        imageFile: media.url,
        alt: media.altText,
      };
      productPictures.push(productMedia);
    }

    return productPictures;
  }

  async buildStorefrontProduct(
    flatProduct: ProductFlatModel,
    productStatusId: number,
    manufacturerObj: StorefrontManufacturerModel,
    primaryCategoryId: number,
    storefrontCategories: StorefrontProductCategoriesModel[],
    storefrontAttributes: StorefrontProductAttributeModel[],
    storefrontProductPictures: StorefrontProductPictureModel[],
  ): Promise<StorefrontProductModel> {
    const storefrontProduct = {
      cartProductId: flatProduct.cartProductId,
      itemNumber: flatProduct.externalProductId,
      extUpdateDate: flatProduct.extUpdateDate,
      manufacturerId: manufacturerObj.id,
      manufacturerPartNumber: flatProduct.externalProductId,
      primaryCategoryId: primaryCategoryId,
      productStatusId: productStatusId,
      itemName: flatProduct.name,
      shortDescription: '',
      longDescription2: flatProduct.descriptions[0] || '',
      longDescription3: flatProduct.descriptions[1] || '',
      longDescription4: flatProduct.descriptions[2] || '',
      longDescription5: flatProduct.descriptions[3] || '',
      height: '',
      length: '',
      width: '',
      sizeUnit: '',
      weight: 0,
      weightUnit: '',
      price: flatProduct.price,
      isKit: flatProduct.isKit,
      variants: [],
      categories: storefrontCategories,
      attributes: storefrontAttributes,
      pictures: storefrontProductPictures,
    };

    return storefrontProduct;
  }

  async getProductStatusFromStorefront() {
    try {
      const productStatusList = await this.storefrontProductService.getStatus();

      if (
        productStatusList &&
        productStatusList.data &&
        productStatusList.data.store_productStatusList
      ) {
        return productStatusList.data.store_productStatusList.results;
      }
    } catch (err) {
      console.error(err);
    }
  }

  getManufacturerName(
    cartAttributes: CartProductVariantAttributeValue[],
  ): string {
    const cartAttribute = cartAttributes.find((attribute) => {
      if (attribute.productVariantAttribute.name === this.MANUFACTURERTOKEN) {
        return attribute;
      }
    });

    return cartAttribute.value;
  }

  async getOrCreateStorefrontManufacturer(
    manufacturerName: string,
  ): Promise<StorefrontManufacturerModel> {
    let manufacturerData;
    let storeManufacturer: StorefrontManufacturerModel;
    try {
      manufacturerData = await this.getManufacturerFromStorefront(
        manufacturerName,
      );
      if (
        manufacturerData &&
        manufacturerData.data &&
        manufacturerData.data.store_manufacturerList.count > 0
      ) {
        storeManufacturer =
          manufacturerData.data.store_manufacturerList.results[0];
      }
    } catch (err) {
      console.error(err);
    }

    if (
      manufacturerData &&
      manufacturerData.data.store_manufacturerList.count == 0
    ) {
      // Do create manufacturer
      try {
        manufacturerData = await this.createManufacturerInStorefront(
          manufacturerName,
        );

        if (
          manufacturerData &&
          manufacturerData.data.store_manufacturerCreate.count > 0
        ) {
          storeManufacturer =
            manufacturerData.data.store_manufacturerCreate.results[0];
        }
      } catch (err) {
        console.error(err);
      }
    }

    return storeManufacturer;
  }

  async getManufacturerFromStorefront(storeManufacturerName: string) {
    try {
      const manufacturerList =
        await this.storefrontProductService.getManufacturers(
          storeManufacturerName,
        );

      if (manufacturerList) {
        return manufacturerList;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createManufacturerInStorefront(storeManufacturerName: string) {
    try {
      const manufacturer =
        await this.storefrontProductService.createManufacturer(
          storeManufacturerName,
        );

      return manufacturer;
    } catch (err) {
      console.error(err);
    }
  }

  async convertToStorefrontCategories(
    productCategories: Category[],
  ): Promise<StorefrontProductCategoriesModel[]> {
    const storefrontProductCategories: StorefrontProductCategoriesModel[] = [];

    try {
      for (const category of productCategories) {
        const storefrontCategory = await this.getOrCreateStorefrontCategory(
          category.name,
        );
        if (storefrontCategory) {
          const storefrontProductCategory: StorefrontProductCategoriesModel = {
            id: storefrontCategory.id,
            isPrimary: true,
            name: storefrontCategory.name,
          };
          storefrontProductCategories.push(storefrontProductCategory);
        }
      }

      return storefrontProductCategories;
    } catch (err) {
      console.error(err);
    }
  }

  async convertToStorefrontProductAttributeGroups(
    cartAttributes: CartProductVariantAttributeValue[],
  ): Promise<GroupAttributeModel[]> {
    const storefrontProductGroupAttributes: GroupAttributeModel[] = [];
    try {
      for (const attribute of cartAttributes) {
        if (
          // Skip 'product_manufacturer' for converted StorefrontProductAttributes
          attribute.productVariantAttribute.name !== this.MANUFACTURERTOKEN
        ) {
          const storefrontProductAttributeGroup =
            await this.getOrCreateStorefrontProductAttributeGroup(
              attribute.productVariantAttribute.name,
            );
          const groupAttribute: GroupAttributeModel = {
            attributeGroupId: storefrontProductAttributeGroup.id,
            attributeName: attribute.value,
          };
          storefrontProductGroupAttributes.push(groupAttribute);
        }
      }
    } catch (err) {
      console.error(err);
    }

    return storefrontProductGroupAttributes;
  }

  async convertToStorefrontProductAttributes(
    groupAttributes: GroupAttributeModel[],
  ): Promise<StorefrontProductAttributeModel[]> {
    const storefrontProductAttributes: StorefrontProductAttributeModel[] = [];
    try {
      for (const groupAttribute of groupAttributes) {
        const storefrontProductAttribute =
          await this.getOrCreateStorefrontProductAttribute(
            groupAttribute.attributeGroupId,
            groupAttribute.attributeName,
          );

        storefrontProductAttributes.push(storefrontProductAttribute);
      }
    } catch (err) {
      console.error(err);
    }

    return storefrontProductAttributes;
  }

  async getOrCreateStorefrontProductAttributeGroup(
    attributeName: string,
  ): Promise<StorefrontAttributeGroupModel> {
    let attributeGroup: StorefrontAttributeGroupModel;
    let attributeGroupData;
    try {
      attributeGroupData = await this.getAttributeGroupFromStorefront(
        attributeName,
      );

      if (
        attributeGroupData &&
        attributeGroupData.data.store_attributeGroupList.count > 0
      ) {
        attributeGroup =
          attributeGroupData.data.store_attributeGroupList.results[0];

        return attributeGroup;
      }
    } catch (err) {
      console.error(err);
    }

    if (
      attributeGroupData &&
      attributeGroupData.data.store_attributeGroupList.count == 0
    ) {
      try {
        // Do create attributeGroup
        attributeGroupData = await this.createAttributeGroupInStorefront(
          attributeName,
        );

        if (
          attributeGroupData &&
          attributeGroupData.data.store_attributeGroupList.count > 0
        ) {
          attributeGroup = attributeGroupData.data.store_attributeGroupCreate;

          return attributeGroup;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async getAttributeGroupFromStorefront(storeAttributeGroupName: string) {
    try {
      const attributeGroupList =
        await this.storefrontProductService.getAttributeGroups(
          storeAttributeGroupName,
        );

      if (attributeGroupList) {
        return attributeGroupList;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createAttributeGroupInStorefront(
    storeAttributeGroupName: string,
  ): Promise<StorefrontAttributeGroupModel> {
    try {
      let attributeGroup;
      await this.storefrontProductService
        .createAttributeGroup(storeAttributeGroupName)
        .then((attrGroup) => {
          attributeGroup = attrGroup;
        });

      return attributeGroup;
    } catch (err) {
      console.error(err);
    }
  }

  async getOrCreateStorefrontProductAttribute(
    attributeGroupId: number,
    storeAttributeName: string,
  ): Promise<StorefrontAttributeGroupModel> {
    let attribute: StorefrontAttributeModel;
    let attributeData;
    try {
      attributeData = await this.getAttributeFromStorefront(
        attributeGroupId,
        storeAttributeName,
      );

      if (attributeData && attributeData.data.store_attributeList.count > 0) {
        attribute = attributeData.data.store_attributeList.results[0];

        const storeAttribute: StorefrontAttributeModel = {
          id: attribute.id,
          attributeGroupId: attribute.attributeGroupId,
          name: attribute.name,
          isHidden: attribute.isHidden,
          sortOrder: attribute.sortOrder,
          pageTitle: attribute.pageTitle,
          keywords: attribute.keywords,
          metaDescription: attribute.metaDescription,
          urlRewrite: attribute.urlRewrite,
          isNew: attribute.isNew ?? true,
        };

        return storeAttribute;
      }
    } catch (err) {
      console.error(err);
    }

    if (attributeData && attributeData.data.store_attributeList.count == 0) {
      try {
        // Do create attribute
        attributeData = await this.createAttributeInStorefront(
          attributeGroupId,
          storeAttributeName,
        );

        if (
          attributeData &&
          attributeData.data.store_attributeGroupList.count > 0
        ) {
          attribute = attributeData.data.store_attributeGroupCreate;

          const storeAttribute: StorefrontAttributeModel = {
            id: attribute.id,
            attributeGroupId: attribute.attributeGroupId,
            name: attribute.name,
            isHidden: attribute.isHidden,
            sortOrder: attribute.sortOrder,
            pageTitle: attribute.pageTitle,
            keywords: attribute.keywords,
            metaDescription: attribute.metaDescription,
            urlRewrite: attribute.urlRewrite,
            isNew: attribute.isNew ?? true,
          };

          return storeAttribute;
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async getAttributeFromStorefront(
    attributeGroupId: number,
    storeAttributeName: string,
  ) {
    try {
      const attributes = await this.storefrontProductService.getAttributes(
        attributeGroupId,
        storeAttributeName,
      );

      if (attributes) {
        return attributes;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createAttributeInStorefront(
    attributeGroupId: number,
    storeAttributeGroupName: string,
  ) {
    try {
      const attributeList = await this.storefrontProductService.createAttribute(
        attributeGroupId,
        storeAttributeGroupName,
      );

      if (attributeList) {
        return attributeList;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getOrCreateStorefrontCategory(
    categoryName: string,
  ): Promise<StorefrontCategoryModel> {
    let categoryData;
    let storeCategory: StorefrontCategoryModel;
    try {
      categoryData = await this.getCategoryFromStorefront(categoryName);
      if (
        categoryData &&
        categoryData.data &&
        categoryData.data.store_categoryList.count > 0
      ) {
        storeCategory = categoryData.data.store_categoryList.results[0];
      }
    } catch (err) {
      console.error(err);
    }

    if (categoryData && categoryData.data.store_categoryList.count == 0) {
      try {
        categoryData = await this.createCategoryInStorefront(categoryName);

        if (categoryData && categoryData.data.store_categoryCreate.count > 0) {
          storeCategory = categoryData.data.store_categoryCreate.results[0];
        }
      } catch (err) {
        console.error(err);
      }
    }

    return storeCategory;
  }

  async getCategoryFromStorefront(storeCategoryName: string) {
    try {
      const categoryList = await this.storefrontProductService.getCategories(
        storeCategoryName,
      );

      if (categoryList) {
        return categoryList;
      }
    } catch (err) {
      console.error(err);
    }
  }

  async createCategoryInStorefront(storeCategoryName: string) {
    try {
      let category;
      await this.storefrontProductService
        .createCategory(storeCategoryName)
        .then((cate) => {
          category = cate;
        });

      return category;
    } catch (err) {
      console.error(err);
    }
  }
}
