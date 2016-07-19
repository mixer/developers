'use strict';

/**
 * Creates a new object with all values from the passed object ordered by keys.
 * @param  {Object} obj
 * @return {Object}
 */
exports.orderObject = function orderObject (obj) {
    const ret = {};
    const orderedKeys = Object.keys(obj).sort();
    for (const key of orderedKeys) {
        ret[key] = obj[key];
    }
    return ret;
};
