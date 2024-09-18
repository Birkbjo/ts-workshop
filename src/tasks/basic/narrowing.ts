import { Equal, Expect } from './../helpers/expect';
import { User } from "../helpers/models";



/* TASK: Implement types for the signature, and the code for the function
userOrId can be either be an object with { id: string } or a string, and should return the string */
export const getUserId = (userOrId: unknown) => {
}

const user = {
    id: '123',
    username: 'John Doe'
}
const testId = getUserId('123')
const testId2 = getUserId(user)

type cases = [
    Expect<Equal<typeof testId, string>>,
    Expect<Equal<typeof testId2, string>>,
]



const ids = ['1', '2', null, undefined]


/* TASK: Filter ids-array, the result should be a type without null or undefined */
const filteredIds = ids

type cases2 = [
    Expect<Equal<typeof truthyIds, Array<string>>>,
]
