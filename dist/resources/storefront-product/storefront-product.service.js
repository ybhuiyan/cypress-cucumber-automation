"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorefrontProductService = void 0;
const common_1 = require("@nestjs/common");
const map_service_1 = require("../../shared/services/mapping/map.service");
const storefront_client_1 = require("../../shared/services/client/storefront-client");
const core_1 = require("@apollo/client/core");
let StorefrontProductService = class StorefrontProductService {
    constructor(mapService) {
        this.mapService = mapService;
    }
    async create(createProductInput) {
        const QUERY = (0, core_1.gql) `
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
        const storeProduct = await (0, storefront_client_1.executeMutation)(QUERY, storeProductInput);
        return storeProduct;
    }
    async update(id, updateStorefrontProductInput) {
        const QUERY = (0, core_1.gql) `
      mutation Mutation($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput) {
          exampleField
        }
      }
    `;
    }
    async remove(id) {
        const QUERY = (0, core_1.gql) ``;
    }
    async getStatus() {
        const QUERY = (0, core_1.gql) `
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
            const attributeList = await (0, storefront_client_1.executeQuery)(QUERY, requestOptions);
            return attributeList;
        }
        catch (err) {
            console.error(err);
        }
    }
    async getAttributeGroups(attributeName) {
        const QUERY = (0, core_1.gql) `
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
            const attributeGroupList = await (0, storefront_client_1.executeQuery)(QUERY, requestOptions);
            return attributeGroupList;
        }
        catch (err) {
            console.error(err);
        }
    }
    async createAttributeGroup(attributeName) {
        const QUERY = (0, core_1.gql) `
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
            const attributeGroup = await (0, storefront_client_1.executeMutation)(QUERY, requestOptions);
            return attributeGroup;
        }
        catch (err) {
            console.error(err);
        }
    }
    async getAttributes(attributeGroupId, attributeName) {
        const QUERY = (0, core_1.gql) `
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
            const attributeList = await (0, storefront_client_1.executeQuery)(QUERY, requestOptions);
            return attributeList;
        }
        catch (err) {
            console.error(err);
        }
    }
    async createAttribute(attributeGroupId, attributeValue) {
        const QUERY = (0, core_1.gql) `
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
            const attribute = await (0, storefront_client_1.executeMutation)(QUERY, requestOptions);
            return attribute;
        }
        catch (err) {
            console.error(err);
        }
    }
    async getCategories(storeCategoryName) {
        const QUERY = (0, core_1.gql) `
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
            const categoryList = await (0, storefront_client_1.executeQuery)(QUERY, requestOptions);
            return categoryList;
        }
        catch (err) {
            console.error(err);
        }
    }
    async createCategory(categoryName) {
        const QUERY = (0, core_1.gql) `
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
            const category = await (0, storefront_client_1.executeMutation)(QUERY, requestOptions);
            return category;
        }
        catch (err) {
            console.error(err);
        }
    }
    async getManufacturers(storeManufacturerName) {
        const QUERY = (0, core_1.gql) `
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
            const manufacturerList = await (0, storefront_client_1.executeQuery)(QUERY, requestOptions);
            return manufacturerList;
        }
        catch (err) {
            console.error(err);
        }
    }
    async createManufacturer(manufacturerName) {
        const QUERY = (0, core_1.gql) `
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
            const manufacturer = await (0, storefront_client_1.executeMutation)(QUERY, requestOptions);
            return manufacturer;
        }
        catch (err) {
            console.error(err);
        }
    }
};
StorefrontProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [map_service_1.MapService])
], StorefrontProductService);
exports.StorefrontProductService = StorefrontProductService;
//# sourceMappingURL=storefront-product.service.js.map