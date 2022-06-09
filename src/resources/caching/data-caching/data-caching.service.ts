import { Injectable } from '@nestjs/common';
import {
  StorefrontAttributeGroupModel,
  StorefrontAttributeModel,
} from '../../models/storefront.model';
import { PrismaService } from '../../../shared/services/prisma/prisma.service';

@Injectable()
export class DataCachingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Creates a StorefrontAttributeGroup
   * @param createAttributeGroup
   * @returns the newly created StorefrontAttributeGroup
   */
  async createAttributeGroup(
    createAttributeGroup: StorefrontAttributeGroupModel,
  ): Promise<StorefrontAttributeGroupModel> {
    const newAttributeGroup = await this.prisma.attributeGroup.create({
      data: {
        id: createAttributeGroup.id,
        name: createAttributeGroup.name,
        isNew: createAttributeGroup.isNew,
      },
    });
    return newAttributeGroup;
  }

  /**
   * Lists all StorefrontAttributeGroup
   * @returns an array of StorefrontAttributeGroup
   */
  async findAllAttributeGroups(): Promise<StorefrontAttributeGroupModel[]> {
    return await this.prisma.attributeGroup.findMany();
  }

  /**
   * Finds an individual StorefrontAttributeGroup by the supplied StorefrontAttributeGroup id
   * @param id
   * @returns the StorefrontAttributeGroup matching the supplied id
   */
  async findOneAttributeGroup(
    id: number,
  ): Promise<StorefrontAttributeGroupModel> {
    return await this.prisma.attributeGroup.findFirst({
      where: { id },
    });
  }

  /**
   * Updates a StorefrontAttributeGroup
   * @param id
   * @param updateAttributeGroup
   * @returns the newly updated StorefrontAttributeGroup
   */
  async updateAttributeGroup(
    id: number,
    updateAttributeGroup: StorefrontAttributeGroupModel,
  ): Promise<StorefrontAttributeGroupModel> {
    const updatedAttributeGroup = await this.prisma.attributeGroup.update({
      where: { id: id },
      data: {
        id: updateAttributeGroup.id,
        name: updateAttributeGroup.name,
      },
    });

    return updatedAttributeGroup;
  }

  /**
   * Creates a StorefrontAttribute
   * @param createAttribute
   * @returns the newly created StorefrontAttribute
   */
  async createAttribute(
    createAttribute: StorefrontAttributeModel,
  ): Promise<StorefrontAttributeModel> {
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

  /**
   * Lists all StorefrontAttribute
   * @returns an array of StorefrontAttribute
   */
  async findAllAttributes(): Promise<StorefrontAttributeModel[]> {
    return await this.prisma.attribute.findMany();
  }

  /**
   * Finds an individual StorefrontAttribute by the supplied StorefrontAttribute id
   * @param id
   * @returns the StorefrontAttribute matching the supplied id
   */
  async findOneAttribute(id: number): Promise<StorefrontAttributeModel> {
    return await this.prisma.attribute.findFirst({
      where: { id },
    });
  }

  /**
   * Updates a StorefrontAttribute
   * @param id
   * @param updateAttribute
   * @returns the newly updated StorefrontAttribute
   */
  async updateAttributes(
    id: number,
    updateAttribute: StorefrontAttributeModel,
  ): Promise<StorefrontAttributeModel> {
    const updatedAttribute = await this.prisma.attribute.update({
      where: { id: id },
      data: {
        id: updateAttribute.id,
        name: updateAttribute.name,
      },
    });

    return updatedAttribute;
  }
}
