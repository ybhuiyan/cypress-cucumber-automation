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
exports.CartProductService = void 0;
const common_1 = require("@nestjs/common");
const cart_product_model_1 = require("../models/cart-product.model");
const map_service_1 = require("../../shared/services/mapping/map.service");
const storefront_product_service_1 = require("../storefront-product/storefront-product.service");
const product_storefront_mapping_service_1 = require("../product-mapping/product-storefront-mapping.service");
let CartProductService = class CartProductService {
    constructor(mapService, storefrontProductService, productStorefrontMappingService) {
        this.mapService = mapService;
        this.storefrontProductService = storefrontProductService;
        this.productStorefrontMappingService = productStorefrontMappingService;
    }
    async handleComingProduct(cartProduct) {
        const AA_ORG_ID = 1337;
        if (cartProduct.organizationId === AA_ORG_ID) {
            console.log('Product from Product service: ' +
                JSON.stringify(cartProduct).substring(0, 1000));
            try {
                const storefrontProducts = await this.convertProduct(cartProduct);
                if (storefrontProducts.length > 0) {
                    for (const storefrontProduct of storefrontProducts) {
                        await this.storefrontProductService.create(storefrontProduct);
                    }
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    }
    async convertProduct(cartProduct) {
        try {
            const flatProducts = await this.flatProduct(cartProduct);
            const storefrontProducts = [];
            for (const flatProduct of flatProducts) {
                const storefrontProduct = await this.productStorefrontMappingService.convertToStorefrontProduct(flatProduct);
                storefrontProducts.push(storefrontProduct);
            }
            return storefrontProducts;
        }
        catch (err) {
            console.error(err);
        }
    }
    async flatProduct(cartProduct) {
        const flats = cartProduct.productVariants.map((variant) => {
            const flat = {
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
                isKit: variant.type == cart_product_model_1.ProductType.BUNDLE ? true : false,
            };
            return flat;
        });
        return flats;
    }
};
CartProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [map_service_1.MapService,
        storefront_product_service_1.StorefrontProductService,
        product_storefront_mapping_service_1.ProductStorefrontMappingService])
], CartProductService);
exports.CartProductService = CartProductService;
//# sourceMappingURL=cart-product.service.js.map