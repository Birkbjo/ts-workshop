import { CircularLoader, CircularLoaderProps } from "@dhis2/ui"
import React from "react"
import type { Access } from "../../helpers/models"


/* Task: Inspect the types of CircularLoader above. And create a sensible type and implementation for the SmallLoader using utility types from typescript:
https://www.typescriptlang.org/docs/handbook/utility-types.html 
*/
type SmallLoaderProps = any

export const SmallLoader = (props: SmallLoaderProps) => {
    return null
}



/* Task: Implement the missing type below

Hint: Look at type imports */

const dataElement = { id: '1', displayName: 'Data element 1', access: { read: true, write: false } }

type ModelWithAccess = unknown

const canRead = (model: ModelWithAccess) => {
    return model.access.read
}
const isReadable = canRead(dataElement)
