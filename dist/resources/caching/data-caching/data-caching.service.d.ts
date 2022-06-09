import { StorefrontAttributeGroupModel, StorefrontAttributeModel } from '../../models/storefront.model';
import { PrismaService } from '../../../shared/services/prisma/prisma.service';
export declare class DataCachingService {
    private prisma;
    constructor(prisma: PrismaService);
    createAttributeGroup(createAttributeGroup: StorefrontAttributeGroupModel): Promise<StorefrontAttributeGroupModel>;
    findAllAttributeGroups(): Promise<StorefrontAttributeGroupModel[]>;
    findOneAttributeGroup(id: number): Promise<StorefrontAttributeGroupModel>;
    updateAttributeGroup(id: number, updateAttributeGroup: StorefrontAttributeGroupModel): Promise<StorefrontAttributeGroupModel>;
    createAttribute(createAttribute: StorefrontAttributeModel): Promise<StorefrontAttributeModel>;
    findAllAttributes(): Promise<StorefrontAttributeModel[]>;
    findOneAttribute(id: number): Promise<StorefrontAttributeModel>;
    updateAttributes(id: number, updateAttribute: StorefrontAttributeModel): Promise<StorefrontAttributeModel>;
}
