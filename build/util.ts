/**
 * Creates a new object with all values from the passed object ordered by keys.
 */
export function orderObject<T, K extends keyof T>(obj: T): { [P in K]: T[P]; } {
    const ret: { [P in K]: T[P]; } = <any>{};
    const orderedKeys = <K[]>Object.keys(obj).sort();
    for (const key of orderedKeys) {
        ret[key] = obj[key];
    }
    return ret;
}
