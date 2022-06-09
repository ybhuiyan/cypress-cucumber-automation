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
exports.StorefrontProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
let StorefrontProductInput = class StorefrontProductInput {
};
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Example field (placeholder)' }),
    __metadata("design:type", Number)
], StorefrontProductInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Example field (placeholder)',
    }),
    __metadata("design:type", String)
], StorefrontProductInput.prototype, "itemNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'Example field (placeholder)',
    }),
    __metadata("design:type", Number)
], StorefrontProductInput.prototype, "manufacturerId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Example field (placeholder)',
    }),
    __metadata("design:type", String)
], StorefrontProductInput.prototype, "manufacturerPartNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'Example field (placeholder)',
    }),
    __metadata("design:type", Number)
], StorefrontProductInput.prototype, "primaryCategoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, {
        description: 'Example field (placeholder)',
    }),
    __metadata("design:type", Number)
], StorefrontProductInput.prototype, "productStatusId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, {
        description: 'Example field (placeholder)',
    }),
    __metadata("design:type", String)
], StorefrontProductInput.prototype, "itemName", void 0);
StorefrontProductInput = __decorate([
    (0, graphql_1.InputType)()
], StorefrontProductInput);
exports.StorefrontProductInput = StorefrontProductInput;
//# sourceMappingURL=storefront-product.input.js.map