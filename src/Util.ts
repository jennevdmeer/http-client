const toString = Object.prototype.toString;

// export function isArray(val) {
//     return toString.call(val) === '[object Array]';
// }
//
// export function isUndefined(val) {
//     return typeof val === 'undefined';
// }
//
// export function isBuffer(val) {
//     return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
//         && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
// }
//
// export function isArrayBuffer(val) {
//     return toString.call(val) === '[object ArrayBuffer]';
// }
//
// export function isArrayBufferView(val) {
//     let result;
//     if ((typeof ArrayBuffer !== 'undefined') && ArrayBuffer.isView) {
//         result = ArrayBuffer.isView(val);
//     } else {
//         result = val && val.buffer && val.buffer instanceof ArrayBuffer;
//     }
//
//     return result;
// }

export function isFormData(val) {
    return typeof FormData !== 'undefined' && val instanceof FormData;
}
//
// export function isString(val) {
//     return typeof val === 'string';
// }
//
// export function isNumber(val) {
//     return typeof val === 'number';
// }
//
// export function isObject(val) {
//     return val !== null && typeof val === 'object';
// }
//
// export function isPlainObject(val) {
//     if (toString.call(val) !== '[object Object]') {
//         return false;
//     }
//
//     const prototype = Object.getPrototypeOf(val);
//     return prototype === null || prototype === Object.prototype;
// }
//
// export function isDate(val) {
//     return toString.call(val) === '[object Date]';
// }

export function isFile(val) {
    return toString.call(val) === '[object File]';
}

export function isBlob(val) {
    return toString.call(val) === '[object Blob]';
}

// export function isFunction(val) {
//     return toString.call(val) === '[object Function]';
// }
//
// export function isStream(val) {
//     return isObject(val) && isFunction(val.pipe);
// }
//
// export function isURLSearchParams(val) {
//     return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
// }
