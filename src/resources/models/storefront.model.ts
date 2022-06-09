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
  // cost?: number;
  price?: number;
  // retail: number;
  // minimumQuantity: number;
  // maximumQuantity: number;
  // isSpotlightItem: number;
  // quantityOnHand: number;
  // keywords: string;
  // isNonTaxable: number;
  // isShippedIndividually: number;
  // isHidden: number;
  // sortOrder: number;
  // eProductType: string;
  // eProductUrl: string;
  // eProductPassword: string;
  // eProductVerificationLinkExpiration: number;
  // eProductEmail: string;
  // eProductAllowMultipleDeliveries: number;
  // warehouseId: number;
  // callForShipping: number;
  // quickbooksItemId: string;
  // callForPricing: number;
  // rateAdjustmentType: string;
  // metaDescription: string;
  // pageTitle: string;
  // useTabs: boolean;
  // relatedName: string;
  // overrideThemeUseTabs: boolean;
  // longDescriptionTabName1: string;
  // longDescriptionTabName2: string;
  // longDescriptionTabName3: string;
  // longDescriptionTabName4: string;
  // longDescriptionTabName5: string;
  // longDescription1: string;
  // isNonShippingItem: boolean;
  // eProductDeliveryAction: string;
  // useVariantInventory: boolean;
  // isFeaturedItem: boolean;
  // longDescriptionExternalUrl1: string;
  // longDescriptionExternalUrl2: string;
  // longDescriptionExternalUrl3: string;
  // longDescriptionExternalUrl4: string;
  // longDescriptionExternalUrl5: string;
  // bulletsExternalUrl: string;
  // customFlag1: boolean;
  // customFlag2: boolean;
  // customFlag3: boolean;
  // customFlag4: boolean;
  // customFlag5: boolean;
  createdAt?: string;
  updatedAt?: string;
  // urlRewrite: string;
  isKit: boolean;
  // isChildProduct: boolean;
  // isNonInventory: boolean;
  // isDiscontinued: boolean;
  // etaDate: string;
  // quantityOnOrder: number;
  // availableRegionId: number;
  // callForShippingOnWholeOrder: boolean;
  // breakOutShipping: boolean;
  // shippingClassificationCode: string;
  // excludeParentFromDisplay: boolean;
  // dropShip: boolean;
  // noPriceMask: string;
  // startingQuantity: number;
  // taxCode: string;
  // useMapPricing: boolean;
  // lastItemNumber: string;
  // hasVisibleVariants: boolean;
  // productRatingDimensionGroupOverrideId: number;
  // averageReviewRating: number;
  // reviewCount: number;
  // excludeChildrenFromDisplay: boolean;
  // usePricingFromParent: boolean;
  // lowStockWarningThreshold: number;
  // enableLowStockWarning: boolean;
  // doNotDiscount: boolean;
  // headTags: string;
  // handlingFee: number;
  // customUpsellUrl: string;
  // eProductSerialNumberFilePath: string;
  // hideVariantSurcharges: boolean;
  // quantityIncrement: number;
  // gtin: string;
  // addToCartMessage: string;
  // isSubscriptionProduct: boolean;
  // subscriptionFrequency: number;
  // subscriptionFrequencyType: string;
  // eProductGenericUsername: string;
  // eProductGenericPassword: string;
  // shippingOverride: number;
  // insuranceCost: number;
  // excludeFromCommissions: boolean;
  // daysUntilReorderAllowed: number;
  // forceSeparateOrder: boolean;
  // approvalRequired: boolean;
  // inStockNotificationEmailTemplateId: number;
  // earnsPoints: boolean;
  // additionalPointsEarned: number;
  // allowedVariableSubscriptionTypes: string;
  // profileId: number;
  // isLinkedProduct: boolean;
  // masterProductId: number;
  // doNotSendReviewRequest: boolean;
  // vendorStoreId: number;
  // isNew: boolean;
  // variants?: StorefrontProductVariantModel[];
  // // personalizations: [PersonalizeModel];
  // // related: [RelatedProductsModel];
  categories?: StorefrontProductCategoriesModel[];
  // // inactiveStoreIds: [!Int];
  // // pricing: [ProductPricingModel];
  attributes?: StorefrontProductAttributeModel[];
  // // variantInventory: [VariantInventoryModel];
  pictures: StorefrontProductPictureModel[];
  // // childProducts: [ProductGroupRelationsModel];
  // // shippingRateAdjustments: [ShippingRateAdjustmentsModel];
  // // reviews: [ProfilePostModel];
  // // customFields: [CustomFieldValueModel];
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
