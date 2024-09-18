import { Expect } from "./../../helpers/expect";
import {
    ResourceQuery,
    JsonMap,
    QueryState,
    DataEngine,
    RefetchFunction,
    QueryOptions,
} from "../../helpers/appRuntimeTypes";

/* Task: below is some simplified types and definitions for useDataQuery.
    The default JsonMapType in useDataQuery is not very useful.

    Improve the default types by inferring the result of data from the query-object.
    Any or unknown is better than JsonMap. 

    Hint: The main idea is to have the keys of "data" object to be the same as keys of the query object.
    Hint: Generics

*/

type Query = {
    [key: string]: ResourceQuery;
};

type QueryResultData = any;

interface QueryResult<TQueryResult = JsonMap> extends QueryState<TQueryResult> {
    engine: DataEngine;
    refetch: RefetchFunction<TQueryResult>;
}

export declare const useDataQuery: <TQueryResultData>(
    query: Query,
    options?: QueryOptions<TQueryResultData>
) => QueryResult<TQueryResultData>;

type DataElementsData = {
    dataElements: {
        dataElements: {
            id: string;
            name: string;
        }[];
    };
};
const deQueryResult = useDataQuery({
    dataElements: {
        resource: "dataElements",
        id: "id",
        params: {
            fields: ["id", "name"],
        },
    },
});

//TODO: this should be valid
const data = deQueryResult.data?.dataElements;

const a = useDataQuery<DataElementsData>({
    result: {
        resource: "dataElements",
        id: "id",
        params: {
            fields: ["id", "name"],
        },
    },
});
