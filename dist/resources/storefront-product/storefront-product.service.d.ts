import { MapService } from '../../shared/services/mapping/map.service';
import { StorefrontProductInput } from './dto/storefront-product.input';
import { StorefrontProductModel } from '../models/storefront.model';
export declare class StorefrontProductService {
    private mapService;
    constructor(mapService: MapService);
    create(createProductInput: StorefrontProductModel): Promise<import("@apollo/client/core").FetchResult<any, Record<string, any>, Record<string, any>>>;
    update(id: number, updateStorefrontProductInput: StorefrontProductInput): Promise<void>;
    remove(id: number): Promise<void>;
    getStatus(): Promise<import("@apollo/client/core").ApolloQueryResult<any>>;
    getAttributeGroups(attributeName: string): Promise<import("@apollo/client/core").ApolloQueryResult<any>>;
    createAttributeGroup(attributeName: string): Promise<import("@apollo/client/core").FetchResult<any, Record<string, any>, Record<string, any>>>;
    getAttributes(attributeGroupId: number, attributeName: string): Promise<import("@apollo/client/core").ApolloQueryResult<any>>;
    createAttribute(attributeGroupId: number, attributeValue: string): Promise<import("@apollo/client/core").FetchResult<any, Record<string, any>, Record<string, any>>>;
    getCategories(storeCategoryName: string): Promise<import("@apollo/client/core").ApolloQueryResult<any>>;
    createCategory(categoryName: string): Promise<import("@apollo/client/core").FetchResult<any, Record<string, any>, Record<string, any>>>;
    getManufacturers(storeManufacturerName: string): Promise<import("@apollo/client/core").ApolloQueryResult<any>>;
    createManufacturer(manufacturerName: string): Promise<import("@apollo/client/core").FetchResult<any, Record<string, any>, Record<string, any>>>;
}
