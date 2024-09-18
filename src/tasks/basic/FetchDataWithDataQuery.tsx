import { useDataQuery } from '@dhis2/app-runtime'
import React from 'react'
import type { DataElement } from '../helpers/models'
import type { PagedResponse } from '../helpers/utility'
import { CircularLoader } from '@dhis2/ui'
import { usePaginationQueryParams } from './validateWithZod'

const query = {
    dataElements: {
        resource: 'dataElements',
        params: {
            fields: ['id', 'displayName'],
            paging: true,
        },
    },
}

/* TASK: Implement type for the response and type the response of useDataQuery

Hint: Look at the imported types
*/
type DataElementResponse = unknown

export const DataElements = () => {
    const { data, error, loading } = useDataQuery(query)
    
    if(!data) {
        return <CircularLoader />
    }
    return <div>
        {data?.dataElements.dataElements.map(de => <div key={de.id}>{de.displayName}</div>)}
    </div>
}



/* TASK: Implement types for the dynamic query 
HINT: The internal types of useDataQuery makes it impossible? to be type-safe
Hint: Look at the type of Query below
*/
// notice how Query is not exported from app-runtime
// but typescript is flexible, and makes it possible to "extract" types using utlity types
type Query = Parameters<typeof useDataQuery>[0]
const dynamicQuery = {
    dataElements: {
        resource: 'dataElements',
        params: ({fields, page }) => ({
            fields:fields,
            paging: true,
            page,
        }),
    },
}
const DynamicDataElements = () => {
    const [fields, setFields] = React.useState(['id', 'displayName'])
    const [page, setPage] = usePaginationQueryParams()
    const { data, error, loading } = useDataQuery(dynamicQuery, { 
        variables: { fields, page }
    })
    
    if(!data) {
        return <CircularLoader />
    }
    return <div>
        {data?.dataElements.dataElements.map(de => <div key={de.id}>{de.displayName}</div>)}
    </div>
}