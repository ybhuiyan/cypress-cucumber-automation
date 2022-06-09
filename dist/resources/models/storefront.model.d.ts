export interface StorefrontProductModel {
    cartProductId: string;
    id?: number;
    itemNumber: string;
    extUpdateDate: string;
    manufacturerId?: number;
    manufacturerPartNumber?: string;
    primaryCategoryId: number;
    productStatusId: number;
    itemName: string;
    shortDescription?: string;
    longDescription2?: string;
    longDescription3?: string;
    longDescription4?: string;
    longDescription5?: string;
    height?: string;
    length?: string;
    width?: string;
    sizeUnit?: string;
    weight?: number;
    weightUnit?: string;
    price?: number;
    createdAt?: string;
    updatedAt?: string;
    isKit: boolean;
    categories?: StorefrontProductCategoriesModel[];
    attributes?: StorefrontProductAttributeModel[];
    pictures: StorefrontProductPictureModel[];
}
export interface StorefrontProductVariantModel {
    cartProductVariantId: string;
    id: number;
    cartProductId: string;
    productId: number;
    variantGroupId: number;
    description: string;
    priceAdjustment: number;
    priceAdjustmentType: string;
    itemNumberExtension: string;
    isHidden: boolean;
    isDefaultSelection: boolean;
    swatchFile: string;
    swatchThumbnail: string;
    swatchThumbnailColor: string;
    isNew: boolean;
}
export interface StorefrontProductAttributeModel {
    id?: number;
    productId?: number;
    cartProductId?: string;
    value?: string;
    attributeGroupId?: number;
    name?: string;
    isHidden?: boolean;
    sortOrder?: number;
    pageTitle?: string;
    keywords?: string;
    metaDescription?: string;
    urlRewrite?: string;
    isNew?: boolean;
}
export interface CustomFieldValueModel {
    id: number;
    customFieldId: number;
    resourceId: number;
    value: string;
    isNew: boolean;
}
export interface StorefrontProductCategoriesModel {
    id: number;
    productId?: number;
    isPrimary: boolean;
    name: string;
    lookupPath?: string;
}
export interface GroupAttributeModel {
    attributeGroupId: number;
    attributeName: string;
}
export interface StorefrontAttributeGroupModel {
    id?: number;
    name?: string;
    sortOrder?: number;
    isHidden?: boolean;
    allowDrillDown?: boolean;
    allowMultiple?: boolean;
    tieVariantInventory?: boolean;
    isNew?: boolean;
}
export interface StorefrontAttributeModel {
    id?: number;
    attributeGroupId: number;
    name: string;
    isHidden?: boolean;
    sortOrder?: number;
    pageTitle?: string;
    keywords?: string;
    metaDescription: string;
    urlRewrite?: string;
    isNew?: boolean;
}
export interface StorefrontCategoryModel {
    id?: number;
    name: string;
    shortDescription?: string;
    sortOrder?: number;
    isHidden?: boolean;
    parentCategoryId?: number;
    maxQuantity?: number;
    categoryThumbnail?: string;
    pageTitle?: string;
    lookupPath?: string;
    keywords?: string;
    metaDescription?: string;
    categoryImage?: string;
    externalContentUrl?: string;
    isCategoryContentDisplayed?: boolean;
    areSubcategoryProductsDisplayed?: boolean;
    urlRewrite?: string;
    updatedAt?: Date;
    createdAt?: Date;
    defaultProductPicture?: string;
    alternateThumbnail?: string;
    headTags?: string;
    catImageAltText?: string;
    thumbImageAltText?: string;
    vendorStoreId?: number;
    isNew?: boolean;
}
export interface StorefrontProductPictureModel {
    id?: number;
    productId?: number;
    imageFile: string;
    alt?: string;
    description?: string;
    isPrimary?: boolean;
    isHidden?: boolean;
    thumbnailFile?: string;
    sortOrder?: number;
    flashPath?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isVideoScreenShot?: boolean;
    videoContent?: string;
}
export interface StorefrontManufacturerModel {
    id?: number;
    name: string;
    description?: string;
    isHidden?: boolean;
    sortOrder?: number;
    manufacturerLogoUrl?: string;
    pageTitle?: string;
    keywords?: string;
    metaDescription?: string;
    urlRewrite?: string;
    updatedAt?: Date;
    createdAt?: Date;
    headTags?: string;
}
