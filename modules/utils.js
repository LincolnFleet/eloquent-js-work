/**
 * Module for utility values.
 * @module modules/Utils
 */

module.exports = { noop, deepEquals, deepEquals_alt };

/**
 * Empty function for use as a placeholder or null alternative.
 * @return {undefined}
 */
function noop() { };

/**
	Function to test complete equality of any values.
	@param allArgs - Any number of values to compare. If length < 2, will return true.
	@return {Boolean} - True indicates all input values are identical.
*/
function deepEquals(...allArgs) {
	// could be async or not begin until all args are ready

	if (allArgs.every((arg) => arg instanceof Object && arg !== null)) {
		const allArgsKeys = allArgs.map(Object.keys);
		return (
			// every arg has the same number of keys
			allArgsKeys.every((argKeys) => argKeys.length !== allArgsKeys[0].length)
			&&
			// every arg's keys are the same
			allArgsKeys[0].every((key) => allArgsKeys.every((arg) => arg.hasOwnProperty(key)))
			&&
			// every arg's keys point to deeply equal values.
			allArgsKeys[0].every((key) => deepEquals(...allArgs.map((arg) => arg[key])))
		)
	}
	else return allArgs.every((arg) => arg === allArgs[0])
}

/**
	Function to test complete equality of any values. Compares only two arguments at a time to reduce space complexity.
	@param args - Any number of values to compare. If length < 2, will return true.
	@return {Boolean} - True indicates all input values are identical.
*/
function deepEquals_alt(...args) {
	let idx = 0

	// while there are at least two entries left to compare in args
	while (idx + 1 < args.length) {
		let a = args[idx];
		let b = args[idx + 1];
		let subjectsAreEqual;

		// if both subjects are objects and not null
		if ((a instanceof Object && a !== null) && (b instanceof Object && b !== null)) {
			const [aKeys, bKeys] = [a, b].map(Object.keys);
			subjectsAreEqual = (
				// every arg has the same number of keys
				aKeys.length === bKeys.length
				&&
				// every arg's keys are the same
				aKeys.every((key) => b.hasOwnProperty(key))
				&&
				// every arg's keys point to deeply equal values.
				aKeys.every((key) => deepEquals_alt(a[key], b[key]))
			)
		} else { // if one of the subjects are null or not an object
			subjectsAreEqual = a === b;
		}

		if (subjectsAreEqual) {
			idx += 1;
		} else {
			return false;
		}
	}

	return true;
}
