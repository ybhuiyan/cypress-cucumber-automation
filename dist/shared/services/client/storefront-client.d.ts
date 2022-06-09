import { ApolloClient } from '@apollo/client/core';
export declare function createClient(): Promise<ApolloClient<import("@apollo/client/core").NormalizedCacheObject>>;
export declare function executeQuery(gqlQuery: any, gqlVariables?: any): Promise<import("@apollo/client/core").ApolloQueryResult<any>>;
export declare function executeMutation(gqlMutation: any, gqlVariables?: any): Promise<import("@apollo/client/core").FetchResult<any, Record<string, any>, Record<string, any>>>;
