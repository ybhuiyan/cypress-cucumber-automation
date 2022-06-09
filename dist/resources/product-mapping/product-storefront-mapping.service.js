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
exports.ProductStorefrontMappingService = void 0;
const common_1 = require("@nestjs/common");
const storefront_product_service_1 = require("../storefront-product/storefront-product.service");
let ProductStorefrontMappingService = class ProductStorefrontMappingService {
    constructor(storefrontProductService) {
        this.storefrontProductService = storefrontProductService;
        this.MANUFACTURERTOKEN = 'product_manufacturer';
    }
    async convertToStorefrontProduct(flatProduct) {
        const manufacturerName = this.getManufacturerName(flatProduct.productVariantAttributes);
        const productPictureList = this.getProductPictures(flatProduct);
        const productStatusList = this.getProductStatusFromStorefront();
        const attributeGroups = this.convertToStorefrontProductAttributeGroups(flatProduct.productVariantAttributes);
        const categories = this.convertToStorefrontCategories(flatProduct.categories);
        const manufacturer = this.getOrCreateStorefrontManufacturer(manufacturerName);
        console.log('Before coverting...');
        let productStatusId;
        let categoryId;
        let attributeGroupResult;
        let manufacturerResult;
        let categoriesResult;
        await Promise.all([
            productStatusList,
            attributeGroups,
            categories,
            manufacturer,
        ]).then(([productStatusResponse, attributeGroupsResponse, categoriesResponse, manufacturerResponse,]) => {
            attributeGroupResult = attributeGroupsResponse;
            productStatusId = productStatusResponse[0].id;
            categoryId = categoriesResponse[0].id;
            manufacturerResult = manufacturerResponse;
            categoriesResult = categoriesResponse;
        });
        console.log('After product properties converting...');
        const attributesResult = await this.convertToStorefrontProductAttributes(attributeGroupResult);
        const storeProduct = await this.buildStorefrontProduct(flatProduct, productStatusId, manufacturerResult, categoryId, categoriesResult, attributesResult, productPictureList);
        console.log('storeProduct', storeProduct);
        return storeProduct;
    }
    getProductPictures(flatProduct) {
        const productPictures = [];
        for (const media of flatProduct.media) {
            const productMedia = {
                imageFile: media.url,
                alt: media.altText,
            };
            productPictures.push(productMedia);
        }
        return productPictures;
    }
    async buildStorefrontProduct(flatProduct, productStatusId, manufacturerObj, primaryCategoryId, storefrontCategories, storefrontAttributes, storefrontProductPictures) {
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
            if (productStatusList &&
                productStatusList.data &&
                productStatusList.data.store_productStatusList) {
                return productStatusList.data.store_productStatusList.results;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    getManufacturerName(cartAttributes) {
        const cartAttribute = cartAttributes.find((attribute) => {
            if (attribute.productVariantAttribute.name === this.MANUFACTURERTOKEN) {
                return attribute;
            }
        });
        return cartAttribute.value;
    }
    async getOrCreateStorefrontManufacturer(manufacturerName) {
        let manufacturerData;
        let storeManufacturer;
        try {
            manufacturerData = await this.getManufacturerFromStorefront(manufacturerName);
            if (manufacturerData &&
                manufacturerData.data &&
                manufacturerData.data.store_manufacturerList.count > 0) {
                storeManufacturer =
                    manufacturerData.data.store_manufacturerList.results[0];
            }
        }
        catch (err) {
            console.error(err);
        }
        if (manufacturerData &&
            manufacturerData.data.store_manufacturerList.count == 0) {
            try {
                manufacturerData = await this.createManufacturerInStorefront(manufacturerName);
                if (manufacturerData &&
                    manufacturerData.data.store_manufacturerCreate.count > 0) {
                    storeManufacturer =
                        manufacturerData.data.store_manufacturerCreate.results[0];
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        return storeManufacturer;
    }
    async getManufacturerFromStorefront(storeManufacturerName) {
        try {
            const manufacturerList = await this.storefrontProductService.getManufacturers(storeManufacturerName);
            if (manufacturerList) {
                return manufacturerList;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async createManufacturerInStorefront(storeManufacturerName) {
        try {
            const manufacturer = await this.storefrontProductService.createManufacturer(storeManufacturerName);
            return manufacturer;
        }
        catch (err) {
            console.error(err);
        }
    }
    async convertToStorefrontCategories(productCategories) {
        const storefrontProductCategories = [];
        try {
            for (const category of productCategories) {
                const storefrontCategory = await this.getOrCreateStorefrontCategory(category.name);
                if (storefrontCategory) {
                    const storefrontProductCategory = {
                        id: storefrontCategory.id,
                        isPrimary: true,
                        name: storefrontCategory.name,
                    };
                    storefrontProductCategories.push(storefrontProductCategory);
                }
            }
            return storefrontProductCategories;
        }
        catch (err) {
            console.error(err);
        }
    }
    async convertToStorefrontProductAttributeGroups(cartAttributes) {
        const storefrontProductGroupAttributes = [];
        try {
            for (const attribute of cartAttributes) {
                if (attribute.productVariantAttribute.name !== this.MANUFACTURERTOKEN) {
                    const storefrontProductAttributeGroup = await this.getOrCreateStorefrontProductAttributeGroup(attribute.productVariantAttribute.name);
                    const groupAttribute = {
                        attributeGroupId: storefrontProductAttributeGroup.id,
                        attributeName: attribute.value,
                    };
                    storefrontProductGroupAttributes.push(groupAttribute);
                }
            }
        }
        catch (err) {
            console.error(err);
        }
        return storefrontProductGroupAttributes;
    }
    async convertToStorefrontProductAttributes(groupAttributes) {
        const storefrontProductAttributes = [];
        try {
            for (const groupAttribute of groupAttributes) {
                const storefrontProductAttribute = await this.getOrCreateStorefrontProductAttribute(groupAttribute.attributeGroupId, groupAttribute.attributeName);
                storefrontProductAttributes.push(storefrontProductAttribute);
            }
        }
        catch (err) {
            console.error(err);
        }
        return storefrontProductAttributes;
    }
    async getOrCreateStorefrontProductAttributeGroup(attributeName) {
        let attributeGroup;
        let attributeGroupData;
        try {
            attributeGroupData = await this.getAttributeGroupFromStorefront(attributeName);
            if (attributeGroupData &&
                attributeGroupData.data.store_attributeGroupList.count > 0) {
                attributeGroup =
                    attributeGroupData.data.store_attributeGroupList.results[0];
                return attributeGroup;
            }
        }
        catch (err) {
            console.error(err);
        }
        if (attributeGroupData &&
            attributeGroupData.data.store_attributeGroupList.count == 0) {
            try {
                attributeGroupData = await this.createAttributeGroupInStorefront(attributeName);
                if (attributeGroupData &&
                    attributeGroupData.data.store_attributeGroupList.count > 0) {
                    attributeGroup = attributeGroupData.data.store_attributeGroupCreate;
                    return attributeGroup;
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    async getAttributeGroupFromStorefront(storeAttributeGroupName) {
        try {
            const attributeGroupList = await this.storefrontProductService.getAttributeGroups(storeAttributeGroupName);
            if (attributeGroupList) {
                return attributeGroupList;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async createAttributeGroupInStorefront(storeAttributeGroupName) {
        try {
            let attributeGroup;
            await this.storefrontProductService
                .createAttributeGroup(storeAttributeGroupName)
                .then((attrGroup) => {
                attributeGroup = attrGroup;
            });
            return attributeGroup;
        }
        catch (err) {
            console.error(err);
        }
    }
    async getOrCreateStorefrontProductAttribute(attributeGroupId, storeAttributeName) {
        var _a, _b;
        let attribute;
        let attributeData;
        try {
            attributeData = await this.getAttributeFromStorefront(attributeGroupId, storeAttributeName);
            if (attributeData && attributeData.data.store_attributeList.count > 0) {
                attribute = attributeData.data.store_attributeList.results[0];
                const storeAttribute = {
                    id: attribute.id,
                    attributeGroupId: attribute.attributeGroupId,
                    name: attribute.name,
                    isHidden: attribute.isHidden,
                    sortOrder: attribute.sortOrder,
                    pageTitle: attribute.pageTitle,
                    keywords: attribute.keywords,
                    metaDescription: attribute.metaDescription,
                    urlRewrite: attribute.urlRewrite,
                    isNew: (_a = attribute.isNew) !== null && _a !== void 0 ? _a : true,
                };
                return storeAttribute;
            }
        }
        catch (err) {
            console.error(err);
        }
        if (attributeData && attributeData.data.store_attributeList.count == 0) {
            try {
                attributeData = await this.createAttributeInStorefront(attributeGroupId, storeAttributeName);
                if (attributeData &&
                    attributeData.data.store_attributeGroupList.count > 0) {
                    attribute = attributeData.data.store_attributeGroupCreate;
                    const storeAttribute = {
                        id: attribute.id,
                        attributeGroupId: attribute.attributeGroupId,
                        name: attribute.name,
                        isHidden: attribute.isHidden,
                        sortOrder: attribute.sortOrder,
                        pageTitle: attribute.pageTitle,
                        keywords: attribute.keywords,
                        metaDescription: attribute.metaDescription,
                        urlRewrite: attribute.urlRewrite,
                        isNew: (_b = attribute.isNew) !== null && _b !== void 0 ? _b : true,
                    };
                    return storeAttribute;
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    async getAttributeFromStorefront(attributeGroupId, storeAttributeName) {
        try {
            const attributes = await this.storefrontProductService.getAttributes(attributeGroupId, storeAttributeName);
            if (attributes) {
                return attributes;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async createAttributeInStorefront(attributeGroupId, storeAttributeGroupName) {
        try {
            const attributeList = await this.storefrontProductService.createAttribute(attributeGroupId, storeAttributeGroupName);
            if (attributeList) {
                return attributeList;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async getOrCreateStorefrontCategory(categoryName) {
        let categoryData;
        let storeCategory;
        try {
            categoryData = await this.getCategoryFromStorefront(categoryName);
            if (categoryData &&
                categoryData.data &&
                categoryData.data.store_categoryList.count > 0) {
                storeCategory = categoryData.data.store_categoryList.results[0];
            }
        }
        catch (err) {
            console.error(err);
        }
        if (categoryData && categoryData.data.store_categoryList.count == 0) {
            try {
                categoryData = await this.createCategoryInStorefront(categoryName);
                if (categoryData && categoryData.data.store_categoryCreate.count > 0) {
                    storeCategory = categoryData.data.store_categoryCreate.results[0];
                }
            }
            catch (err) {
                console.error(err);
            }
        }
        return storeCategory;
    }
    async getCategoryFromStorefront(storeCategoryName) {
        try {
            const categoryList = await this.storefrontProductService.getCategories(storeCategoryName);
            if (categoryList) {
                return categoryList;
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    async createCategoryInStorefront(storeCategoryName) {
        try {
            let category;
            await this.storefrontProductService
                .createCategory(storeCategoryName)
                .then((cate) => {
                category = cate;
            });
            return category;
        }
        catch (err) {
            console.error(err);
        }
    }
};
ProductStorefrontMappingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [storefront_product_service_1.StorefrontProductService])
], ProductStorefrontMappingService);
exports.ProductStorefrontMappingService = ProductStorefrontMappingService;
//# sourceMappingURL=product-storefront-mapping.service.js.map