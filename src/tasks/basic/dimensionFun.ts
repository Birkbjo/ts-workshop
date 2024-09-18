import { DimensionType, DimensionItemType} from '../../helpers/models';

/* TASK: create a type for the dataTypeMap below,
by implementing the defined types. Also add types for the functions

Extra: Look at the reference implementation: https://github.com/dhis2/analytics/blob/master/src/modules/dataTypes.js
 and add the rest of the objects in the map


 Comment: 
    By levaraging unions, you normally don't need defined constants. Since the type will be enforced, and you will get type-completion.

*/

type DataTypeEntry = any

type AnyDimensionType = any

type DataTypeMap = Record<any, any>

export const dataTypeMap: DataTypeMap = {
    'DATA_ELEMENT': {
        id: 'DATA_ELEMENT',
        getName: () => 'Data elements',
        getGroupLabel: () => 'Data element group',
        defaultGroup: {
            id: 'ALL',
            getName: () => 'All groups',
        },
        getItemName: () => 'Data element',
        getGroupEmptyLabel: () => 'No data element groups found',
        getGroupLoadingLabel: () => 'Loading data element groups',
    }
}

export function defaultGroupId(dataType) {
    return dataTypeMap[dataType].defaultGroup
        ? dataTypeMap[dataType].defaultGroup.id
        : ''
}

export function defaultGroupDetail(dataType) {
    return dataTypeMap[dataType].groupDetail
        ? dataTypeMap[dataType].groupDetail.default
        : ''
}