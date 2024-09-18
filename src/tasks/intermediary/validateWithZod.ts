import {
    useQueryParam,
    NumericObjectParam,
    withDefault,
} from 'use-query-params'
import { z } from 'zod'

const VALID_PAGE_SIZES = [5, 10, 20, 30, 40, 50, 75, 100]
const defaultPaginationQueryParams = {
    page: 1,
    pageSize: 20,
}


const pagerSchema = z.object({
    page: z.number(),
    pageSize: z.number(),
}).refine(pager => VALID_PAGE_SIZES.reduce((prev, curr) =>
    Math.abs(curr - pager.pageSize) < Math.abs(prev - pager.pageSize) ? curr : prev ))

// task 1: Implement the type of PaginationQueryParams
type PaginationQueryParams = any


const paginationQueryParamsConfig = withDefault(
    NumericObjectParam,
    defaultPaginationQueryParams
)


/* TASK: Implement validate below using pagerSchema. */ 
const validatePagerParams = (
    params: typeof paginationQueryParamsConfig.default
): PaginationQueryParams => {
    return null //>> implement
}

/* Task: 
    Implement a custom hook usePaginationQueryParams that returns the same type as "useQueryParam".
    The value should be validated using validatePagerParams above.

    Hint: as const
*/
export const usePaginationQueryParams = (): PaginationQueryParams   => {
    const [params, setParams] = useQueryParam(
        'pager',
        paginationQueryParamsConfig,
        {
            removeDefaultsFromUrl: true,
        }
    )

    // TODO: validate and return same signature as useQueryParam
}
