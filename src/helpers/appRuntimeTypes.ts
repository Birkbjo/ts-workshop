// import DataEngine from './engine/DataEngine';
// import { QueryExecuteOptions } from './engine/types/ExecuteOptions';
// import { FetchError } from './engine/types/FetchError';
// import { JsonValue } from './engine/types/JsonValue';
// import { QueryVariables, QueryResult } from './engine/types/Query';

export declare type FetchErrorTypeName =
    | "network"
    | "unknown"
    | "access"
    | "aborted";
export declare type FetchErrorDetails = {
    message?: string;
};
export interface FetchErrorPayload {
    type: FetchErrorTypeName;
    details?: FetchErrorDetails;
    message: string;
}
export declare class FetchError extends Error implements FetchErrorPayload {
    type: FetchErrorTypeName;
    details: FetchErrorDetails;
    constructor({ message, type, details }: FetchErrorPayload);
}

export declare const useDataQuery: <TQueryResult = JsonMap>(
    query: Query,
    options?: QueryOptions<TQueryResult>
) => QueryRenderInput<TQueryResult>;

declare type QueryParameterSingularValue = string | number | boolean;
interface QueryParameterAliasedValue {
    [name: string]: QueryParameterSingularValue;
}
declare type QueryParameterSingularOrAliasedValue =
    | QueryParameterSingularValue
    | QueryParameterAliasedValue;
declare type QueryParameterMultipleValue =
    QueryParameterSingularOrAliasedValue[];
export declare type QueryParameterValue =
    | QueryParameterSingularValue
    | QueryParameterAliasedValue
    | QueryParameterMultipleValue
    | undefined;
export interface QueryParameters {
    pageSize?: number;
    [key: string]: QueryParameterValue;
}

export declare type PossiblyDynamic<Type, InputType> =
    | Type
    | ((input: InputType) => Type);

export declare type JsonValue =
    | boolean
    | number
    | string
    | null
    | JsonArray
    | JsonMap;
export interface JsonMap {
    [key: string]: JsonValue;
}
export interface JsonArray extends Array<JsonValue> {}

export declare type QueryVariables = Record<string, any>;

export interface ResourceQuery {
    resource: string;
    id?: PossiblyDynamic<string, QueryVariables>;
    data?: PossiblyDynamic<any, QueryVariables>;
    params?: PossiblyDynamic<QueryParameters, QueryVariables>;
}
export interface ResolvedResourceQuery extends ResourceQuery {
    id?: string;
    data?: any;
    params?: QueryParameters;
}
export declare type Query = Record<string, ResourceQuery>;
export declare type QueryResult = JsonMap;
export interface QueryOptions<TQueryResult = QueryResult> {
    variables?: QueryVariables;
    onComplete?: (data: TQueryResult) => void;
    onError?: (error: FetchError) => void;
    lazy?: boolean;
}

export declare class DataEngine {
    private link;
    constructor(link: DataEngineLink);
    query(
        query: Query,
        { variables, signal, onComplete, onError }?: QueryExecuteOptions
    ): Promise<JsonMap>;
    mutate(
        mutation: Mutation,
        { variables, signal, onComplete, onError }?: QueryExecuteOptions
    ): Promise<JsonValue>;
}

export interface DataEngineLink {
    executeResourceQuery: (
        type: FetchType,
        query: ResolvedResourceQuery,
        options: DataEngineLinkExecuteOptions
    ) => Promise<JsonValue>;
}

export interface ContextType {
    engine: DataEngine;
}
export interface ContextInput {
    baseUrl: string;
    apiVersion: number;
}
export declare type RefetchOptions = QueryVariables;
export declare type RefetchFunction<ReturnType> = (
    options?: RefetchOptions
) => Promise<ReturnType>;
export declare type QueryRefetchFunction = RefetchFunction<QueryResult>;
export declare type MutationFunction = RefetchFunction<JsonValue>;
export declare type ExecuteFunction<T> = (
    options: QueryExecuteOptions
) => Promise<T>;
export interface ExecuteHookInput<ReturnType> {
    execute: ExecuteFunction<ReturnType>;
    variables: QueryVariables;
    singular: boolean;
    immediate: boolean;
    transformData?: (data: JsonValue[]) => JsonValue;
    onComplete?: (data: any) => void;
    onError?: (error: FetchError) => void;
}
export interface ExecuteHookResult<ReturnType> {
    refetch: RefetchFunction<ReturnType>;
    abort: () => void;
    called: boolean;
    loading: boolean;
    error?: FetchError;
    data?: ReturnType;
}
export interface QueryState<TQueryResult> {
    called: boolean;
    loading: boolean;
    fetching: boolean;
    error?: FetchError;
    data?: TQueryResult;
}
export interface QueryRenderInput<TQueryResult = QueryResult>
    extends QueryState<TQueryResult> {
    engine: DataEngine;
    refetch: QueryRefetchFunction;
}
export interface MutationState {
    engine: DataEngine;
    called: boolean;
    loading: boolean;
    error?: FetchError;
    data?: JsonValue;
}
export declare type MutationRenderInput = [MutationFunction, MutationState];
