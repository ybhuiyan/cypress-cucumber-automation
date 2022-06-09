"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartProductModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const cart_product_service_1 = require("./cart-product.service");
const cart_product_resolver_1 = require("./cart-product.resolver");
const cart_product_controller_1 = require("./cart-product.controller");
const storefront_product_module_1 = require("./../storefront-product/storefront-product.module");
const storefront_product_service_1 = require("./../storefront-product/storefront-product.service");
const product_storefront_mapping_service_1 = require("../product-mapping/product-storefront-mapping.service");
const config_1 = require("@nestjs/config");
let CartProductModule = class CartProductModule {
};
CartProductModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            storefront_product_module_1.StorefrontProductModule,
            microservices_1.ClientsModule.register([
                {
                    name: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_CLIENT,
                    transport: microservices_1.Transport.KAFKA,
                    options: {
                        client: {
                            clientId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_CLIENTID,
                            brokers: [process.env.KAFKA_SERVER],
                            ssl: true,
                            sasl: {
                                mechanism: 'plain',
                                username: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_API_KEY,
                                password: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_API_SECRET,
                            },
                        },
                        consumer: {
                            groupId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_GROUPID,
                        },
                    },
                },
            ]),
        ],
        providers: [
            cart_product_resolver_1.CartProductResolver,
            cart_product_service_1.CartProductService,
            storefront_product_service_1.StorefrontProductService,
            product_storefront_mapping_service_1.ProductStorefrontMappingService,
        ],
        controllers: [cart_product_controller_1.CartProductController],
    })
], CartProductModule);
exports.CartProductModule = CartProductModule;
//# sourceMappingURL=cart-product.module.js.map