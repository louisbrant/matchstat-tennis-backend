"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.divideNumbers = exports.countPercentage = exports.fixNull = exports.swapObjectValues = void 0;
function swapObjectValues(obj, noSwap) {
    return noSwap ? {
        [Object.keys(obj)[0]]: Object.values(obj)[0],
        [Object.keys(obj)[1]]: Object.values(obj)[1]
    } : {
        [Object.keys(obj)[0]]: Object.values(obj)[1],
        [Object.keys(obj)[1]]: Object.values(obj)[0]
    };
}
exports.swapObjectValues = swapObjectValues;
function fixNull(num) {
    return num === null ? 0 : num;
}
exports.fixNull = fixNull;
function countPercentage(a, b) {
    if (a === 0 || b === 0) {
        return 0;
    }
    if (a === null || b === null) {
        return 0;
    }
    return +((a / b) * 100).toFixed();
}
exports.countPercentage = countPercentage;
function divideNumbers(a, b) {
    if (a === null || b === null) {
        return 0;
    }
    if (a === 0 || b === 0) {
        return 0;
    }
    return +(a / b).toFixed(2);
}
exports.divideNumbers = divideNumbers;
//# sourceMappingURL=utils.js.map