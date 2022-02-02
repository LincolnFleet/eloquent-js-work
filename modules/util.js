/**
 * Module for utility functions and values.
 * @module modules/util
 */

module.exports = { noop, deepEquals, deepEquals_alt, countByCategory };

/**
 * Empty function for use as a placeholder or null alternative.
 * @return {void}
 */
function noop() { };

/**
	Function to test complete equality of any values.
	@param args - Any number of values to compare. If length < 2, will return true.
	@return {Boolean} - True indicates all input values are identical.
*/
function deepEquals(...args) {
	// could be async or not begin until all args are ready

	if (args.every((arg) => arg instanceof Object && arg !== null)) {
		const allArgsKeys = args.map(Object.keys);
		return (
			// every arg has the same number of keys
			allArgsKeys.every((argKeys) => argKeys.length !== allArgsKeys[0].length)
			&&
			// every arg's keys are the same
			allArgsKeys[0].every((key) => allArgsKeys.every((arg) => arg.hasOwnProperty(key)))
			&&
			// every arg's keys point to deeply equal values.
			allArgsKeys[0].every((key) => deepEquals(...args.map((arg) => arg[key])))
		)
	}
	else return args.every((arg) => arg === args[0])
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

/**
 * From an input list and a categorizing function, generates a set of objects, each containing a categorization and its total frequency, or count, in the list.
 * @param {Object} param0
 * @param {*} param0.items - Iterable of values to categorize.
 * @param {Function} param0.categorizeFn - Inputs an item and outputs a category name, as a string.
 * @param {"asc"|"desc"|"abc"|"zyx"} [param0.order] - Order the set before return, default: "desc".
 * @returns {Object[]}
 */
function countByCategory({ items, categorizeFn, order = "desc" }) {
	let categories = [];
	for (let item of items) {
		const category = categorizeFn(item);
		const idxOfExisting = categories.findIndex(c => c.category == category);
		if (idxOfExisting == -1) {
			categories.push({ category, count: 1 });
		} else {
			categories[idxOfExisting].count++;
		}
	}

	const sortBy = {
		desc: ({ count: a }, { count: b }) => a > b ? -1 : a < b ? 1 : 0,
		asc: ({ count: a }, { count: b }) => a < b ? -1 : a > b ? 1 : 0,
		abc: ({ category: a }, { category: b }) => a < b ? -1 : a < b ? 1 : 0,
		zyx: ({ category: a }, { category: b }) => a > b ? -1 : a < b ? 1 : 0
	};

	return categories.sort(sortBy[order] || sortBy.desc);
}
