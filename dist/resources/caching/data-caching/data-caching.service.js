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
exports.DataCachingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../shared/services/prisma/prisma.service");
let DataCachingService = class DataCachingService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createAttributeGroup(createAttributeGroup) {
        const newAttributeGroup = await this.prisma.attributeGroup.create({
            data: {
                id: createAttributeGroup.id,
                name: createAttributeGroup.name,
                isNew: createAttributeGroup.isNew,
            },
        });
        return newAttributeGroup;
    }
    async findAllAttributeGroups() {
        return await this.prisma.attributeGroup.findMany();
    }
    async findOneAttributeGroup(id) {
        return await this.prisma.attributeGroup.findFirst({
            where: { id },
        });
    }
    async updateAttributeGroup(id, updateAttributeGroup) {
        const updatedAttributeGroup = await this.prisma.attributeGroup.update({
            where: { id: id },
            data: {
                id: updateAttributeGroup.id,
                name: updateAttributeGroup.name,
            },
        });
        return updatedAttributeGroup;
    }
    async createAttribute(createAttribute) {
        const newAttribute = await this.prisma.attribute.create({
            data: {
                id: createAttribute.id,
                attributeGroupId: createAttribute.attributeGroupId,
                name: createAttribute.name,
                isNew: createAttribute.isNew,
            },
        });
        return newAttribute;
    }
    async findAllAttributes() {
        return await this.prisma.attribute.findMany();
    }
    async findOneAttribute(id) {
        return await this.prisma.attribute.findFirst({
            where: { id },
        });
    }
    async updateAttributes(id, updateAttribute) {
        const updatedAttribute = await this.prisma.attribute.update({
            where: { id: id },
            data: {
                id: updateAttribute.id,
                name: updateAttribute.name,
            },
        });
        return updatedAttribute;
    }
};
DataCachingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DataCachingService);
exports.DataCachingService = DataCachingService;
//# sourceMappingURL=data-caching.service.js.map