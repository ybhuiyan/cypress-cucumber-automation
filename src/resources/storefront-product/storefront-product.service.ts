import { Injectable } from '@nestjs/common';
import { MapService } from '../../shared/services/mapping/map.service';
import { StorefrontProductInput } from './dto/storefront-product.input';
import { StorefrontProductModel } from '../models/storefront.model';
import {
  executeQuery,
  executeMutation,
} from '../../shared/services/client/storefront-client';
import { gql } from '@apollo/client/core';

@Injectable()
export class StorefrontProductService {
  constructor(private mapService: MapService) {}

  async create(createProductInput: StorefrontProductModel) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql`
      mutation Store_productCreate($product: ProductModel!) {
        store_productCreate(product: $product) {
          id
          itemNumber
          manufacturerId
          manufacturerPartNumber
          primaryCategoryId
          productStatusId
          itemName
        }
      }
    `;

    const storeProductInput = {
      product: createProductInput,
    };

    const storeProduct = await executeMutation(QUERY, storeProductInput);

    return storeProduct;
  }

  // TODO: need to update this
  async update(
    id: number,
    updateStorefrontProductInput: StorefrontProductInput,
  ) {
    const QUERY = gql`
      mutation Mutation($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
          exampleField
        }
      }
    `;

    // await executeMutation(QUERY, {
    //   createUserInput: {
    //     exampleField: 1,
    //   },
    // });

    // console.log(updateStorefrontProductInput);
    // return `This action updates a #${id} product`;
  }

  // TODO: need to update this
  async remove(id: number) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql``;
    // await executeMutation(QUERY);

    // return `This action removes a #${id} product`;
  }

  async getStatus() {
    const QUERY = gql`
      query Store_productStatusList($getRequestOptions: getRequestInput) {
        store_productStatusList(getRequestOptions: $getRequestOptions) {
          count
          nextPage
          results {
            id
            name
            timeFrame
            isUnavailable
            isHidden
            isBackOrdered
            showQuantity
            updatedAt
            createdAt
          }
        }
      }
    `;

    const requestOptions = {
      getRequestOptions: {
        page: 1,
        count: 100,
        filters: `isUnavailable=false`,
        includeLookups: true,
      },
    };

    try {
      const attributeList = await executeQuery(QUERY, requestOptions);
      return attributeList;
    } catch (err) {
      console.error(err);
    }
  }

  async getAttributeGroups(attributeName: string) {
    const QUERY = gql`
      query Store_attributeGroupList($getRequestOptions: getRequestInput) {
        store_attributeGroupList(getRequestOptions: $getRequestOptions) {
          count
          results {
            id
            name
          }
        }
      }
    `;

    const requestOptions = {
      getRequestOptions: {
        page: 1,
        count: 100,
        filters: `name=${attributeName}`,
        includeLookups: true,
      },
    };

    try {
      const attributeGroupList = await executeQuery(QUERY, requestOptions);

      return attributeGroupList;
    } catch (err) {
      console.error(err);
    }
  }

  async createAttributeGroup(attributeName: string) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql`
      mutation Mutation($attributeGroup: AttributeGroupModel!) {
        store_attributeGroupCreate(attributeGroup: $attributeGroup) {
          id
          name
          sortOrder
          isHidden
          allowDrillDown
          allowMultiple
          tieVariantInventory
        }
      }
    `;

    const requestOptions = {
      attributeGroup: {
        name: attributeName,
        sortOrder: 0,
        isHidden: false,
        allowDrillDown: false,
        allowMultiple: false,
        tieVariantInventory: false,
        isNew: true,
      },
    };

    try {
      const attributeGroup = await executeMutation(QUERY, requestOptions);

      return attributeGroup;
    } catch (err) {
      console.error(err);
    }
  }

  async getAttributes(attributeGroupId: number, attributeName: string) {
    const QUERY = gql`
      query Store_attributeList($getRequestOptions: getRequestInput) {
        store_attributeList(getRequestOptions: $getRequestOptions) {
          count
          results {
            id
            attributeGroupId
            name
            isHidden
            sortOrder
            pageTitle
            keywords
            metaDescription
            urlRewrite
          }
        }
      }
    `;

    const requestOptions = {
      getRequestOptions: {
        page: 1,
        count: 100,
        expand: '',
        ids: '',
        sort: '',
        filters: `attributeGroupId=${attributeGroupId},name=${attributeName}`,
        includeLookups: true,
      },
    };

    try {
      const attributeList = await executeQuery(QUERY, requestOptions);
      return attributeList;
    } catch (err) {
      console.error(err);
    }
  }

  async createAttribute(attributeGroupId: number, attributeValue: string) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql`
      mutation Store_attributeCreate($attribute: AttributeModel!) {
        store_attributeCreate(attribute: $attribute) {
          id
          attributeGroupId
          name
          isHidden
          sortOrder
          pageTitle
          keywords
          metaDescription
          urlRewrite
        }
      }
    `;

    const requestOptions = {
      attribute: {
        attributeGroupId: attributeGroupId,
        name: attributeValue,
        isHidden: false,
        sortOrder: 0,
        pageTitle: '',
        keywords: '',
        metaDescription: '',
        urlRewrite: '',
        isNew: true,
      },
    };

    try {
      const attribute = await executeMutation(QUERY, requestOptions);
      return attribute;
    } catch (err) {
      console.error(err);
    }
  }

  async getCategories(storeCategoryName: string) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql`
      query Query($getRequestOptions: getRequestInput) {
        store_categoryList(getRequestOptions: $getRequestOptions) {
          count
          nextPage
          previousPage
          results {
            id
            name
            shortDescription
            sortOrder
            isHidden
            parentCategoryId
            maxQuantity
            categoryThumbnail
            pageTitle
            lookupPath
            keywords
            metaDescription
            categoryImage
            externalContentUrl
            isCategoryContentDisplayed
            areSubcategoryProductsDisplayed
            urlRewrite
            updatedAt
            createdAt
            defaultProductPicture
            alternateThumbnail
            headTags
            catImageAltText
            thumbImageAltText
            vendorStoreId
            isNew
          }
        }
      }
    `;

    const requestOptions = {
      getRequestOptions: {
        page: 1,
        count: 100,
        filters: `name=${storeCategoryName}`,
        includeLookups: true,
      },
    };

    try {
      const categoryList = await executeQuery(QUERY, requestOptions);
      return categoryList;
    } catch (err) {
      console.error(err);
    }
  }

  async createCategory(categoryName: string) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql`
      mutation Store_categoryCreate($category: CategoryModel!) {
        store_categoryCreate(category: $category) {
          id
          name
          shortDescription
          sortOrder
          isHidden
          parentCategoryId
          maxQuantity
          categoryThumbnail
          pageTitle
          lookupPath
          keywords
          metaDescription
          categoryImage
          externalContentUrl
          isCategoryContentDisplayed
          areSubcategoryProductsDisplayed
          urlRewrite
          defaultProductPicture
          alternateThumbnail
          headTags
          catImageAltText
          thumbImageAltText
          vendorStoreId
          isNew
        }
      }
    `;

    const requestOptions = {
      category: {
        name: categoryName,
        isHidden: false,
      },
    };

    try {
      const category = await executeMutation(QUERY, requestOptions);

      return category;
    } catch (err) {
      console.error(err);
    }
  }

  async getManufacturers(storeManufacturerName: string) {
    // Call Storefront Graphql endpoint to pass data over as query call
    const QUERY = gql`
      query Store_manufacturerList($getRequestOptions: getRequestInput) {
        store_manufacturerList(getRequestOptions: $getRequestOptions) {
          count
          results {
            id
            name
            description
            isHidden
            sortOrder
            manufacturerLogoUrl
            pageTitle
            keywords
            metaDescription
            urlRewrite
            updatedAt
            createdAt
            headTags
          }
        }
      }
    `;

    const requestOptions = {
      getRequestOptions: {
        page: 1,
        count: 100,
        filters: `name=${storeManufacturerName}`,
        includeLookups: true,
      },
    };

    try {
      const manufacturerList = await executeQuery(QUERY, requestOptions);
      return manufacturerList;
    } catch (err) {
      console.error(err);
    }
  }

  async createManufacturer(manufacturerName: string) {
    // Call Storefront Graphql endpoint to pass data over as mutation call
    const QUERY = gql`
      mutation Store_manufacturerCreate($manufacturer: ManufacturerModel!) {
        store_manufacturerCreate(manufacturer: $manufacturer) {
          id
          name
          description
          isHidden
          sortOrder
          manufacturerLogoUrl
          pageTitle
          keywords
          metaDescription
          urlRewrite
          updatedAt
          createdAt
          headTags
        }
      }
    `;

    const requestOptions = {
      manufacturer: {
        name: manufacturerName,
        isNew: false,
      },
    };

    try {
      const manufacturer = await executeMutation(QUERY, requestOptions);

      return manufacturer;
    } catch (err) {
      console.error(err);
    }
  }
}
