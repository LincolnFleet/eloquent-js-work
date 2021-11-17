/** Values, Types and Operators
 * 
 * js uses 64 bit chunks
 * unicode uses 16-bit chunks, and uses two chunks
 * modulo has same precedence as * and /
 * ${} in template literal auto converts expression's return value to string
 * unary operator: uses one value, ex. typeof "string"
 * binary operator: uses two values, ex. 5 + 8
 * ternary operator: uses three values, ex. "cat" ? "hat" : "no hat"
 * NaN is only value not equal to itself
 * 
 */

//  type conversion shennanigans
console.log(null == undefined)
// → true
console.log(null == 0)
//  → false
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true

/**
 * unary + operator will attempt to convert non-numbers to numbers, ex. +false == 0
 * unary + uses valueOf() method on the value, so custom method will control + behavior on object
 */