import { Pager, IdentifiableObject } from "./models";

export type PagedResponse<T, PagedListName extends string = 'result'> = {
    [K in PagedListName]: T[]
} & { pager: Pager }

export type ModelCollectionResponse<
    T extends IdentifiableObject = IdentifiableObject,
    PagedListName extends string = 'result'
> = PagedResponse<T, PagedListName>
