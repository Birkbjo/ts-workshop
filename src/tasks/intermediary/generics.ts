


/* Task 1: Implement types below (without adding new properties to PartialUnit) and fix errors */

interface PartialUnit {
    path: string
    level: number
}

export const findMinimumRootUnits = (
    units: unknown
): unknown => {
    // first sort the units by level, so lowest level comes first
    const sorted = units.sort((a, b) => a.level - b.level)

    const minimumRoots = sorted.filter((ou, index, array) => {
        // since the array is sorted by level we can just check the previous units,
        // because we want to get the "minimum" level
        const previousUnits = array.slice(0, index)
        // if a previous unit has a path that is a prefix of the current path,
        // then the current path is a child and should not be included
        return !previousUnits.some((pu) => ou.path.startsWith(pu.path))
    })

    return minimumRoots
}

const orgUnits = [{ path: '/a', level: 1, name:'Norway' }, { path: '/a/b', level: 2, name: 'Oslo' }, { path: '/a/b/c', level: 3, name: 'Kampen' }, { path: '/b', level: 1, 'Sweden' }]
const unitNames = findMinimumRootUnits(orgUnits).map(ou => ou.name)



/* Task 2: Implement a more typesafe version of the function below and fix the type error.
    The function should take an array and a accessor function, and return an array with unique values based on the accessor function
*/

export const uniqueBy = (
    array: ReadonlyArray<any>,
    accessor: (item: unknown) => any
): any => {
    const set = new Set<any>()

    const uniqueArr: any[] = []
    for (const item of array) {
        const key = accessor(item)
        if (!set.has(key)) {
            set.add(key)
            uniqueArr.push(item)
        }
    }
    return uniqueArr
}

const objects = [{ id: 1, name: 'John' }, { id: 2, name: 'Doe' }, { id: 1, name: 'John' }]
const uniqueObjects = uniqueBy(objects, o => o.id)



