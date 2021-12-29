// Write a range function that takes two arguments, start and end, and returns an array containing all the numbers from start up to (and including) end.
// As a bonus assignment, modify your range function to take an optional third argument that indicates the “step” value used when building the array. If no step is given, the elements go up by increments of one, corresponding to the old behavior.

function range(start, end, step = 1) {
	let range = [];
	for (
		let i = start;
		(start > end ? i >= end : i <= end);
		i += step
	) {
		range.push(i)
	}
	return range;
}

// Next, write a sum function that takes an array of numbers and returns the sum of these numbers. Run the example program and see whether it does indeed return 55.

function sum(arr) {
	let sum = 0;
	for (let num of arr) {
		sum += num;
	}
	return sum;
}

//  For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements.

function reverseArray(arr = []) {
	let reverseArray = [];
	while (arr.length > 0) {
		reverseArray.push(arr.pop());
	}
	return reverseArray;
}

function reverseArrayInPlace(arr = []) {
	for (
		let hi = arr.length - 1, lo = 0;
		hi > lo;
		hi -= 1, lo += 1
	) {
		let hiValue = arr[hi];
		let loValue = arr[lo];
		arr[hi] = loValue;
		arr[lo] = hiValue;
	}
	return arr;
}

// Write a function arrayToList that builds up a list structure like the one shown when given [1, 2, 3] as argument. 
{/*
	let list = {
		value: 1, rest: {
			value: 2, rest: {
				value: 3, rest: null
			}
		}
	};
*/}

function arrayToList(arr = []) {
	let isFirstEntry = true;
	let list = {};
	let workingItem = {}, prevItem = {};
	for (let val of arr) {
		if (isFirstEntry) {
			workingItem = list;
			isFirstEntry = false;
		} else {
			prevItem.rest = {};
			workingItem = prevItem.rest;
		}
		workingItem.value = val;
		workingItem.rest = null;
		prevItem = workingItem;
	}
	return list;
}

// Also write a listToArray function that produces an array from a list.

function listToArray(obj = {}) {
	let arr = [];
	let currentItem = obj;
	while (currentItem.rest) {
		arr.push(currentItem.value);
		currentItem = currentItem.rest;
	}
	return arr;
}

// Then add a helper function prepend, which takes an element and a list and creates a new list that adds the element to the front of the input list, and nth, which takes a list and a number and returns the element at the given position in the list (with zero referring to the first element) or undefined when there is no such element.

function prepend(value, list = {}) {
	return { value, rest: list };
}

function nth(list = {}, idx) {
	let item = list;
	for (let i = 0; i <= idx; i++) {
		if (i === idx) { return item.value; }
		item = item.rest;
	}
}

// Write a function deepEqual that takes two values and returns true only if they are the same value or are objects with the same properties, where the values of the properties are equal when compared with a recursive call to deepEqual.

function deepEqual(A, B) {
	if ((typeof A === "object" && A !== null) && (typeof B === "object" && B !== null)) {
		const AKeys = Object.keys(A);
		const BKeys = Object.keys(B);
		if (AKeys.length !== BKeys.length) { return false; }

		for (let key in AKeys) {
			if (B.hasOwnProperty(key)) { return deepEqual(A[key], B[key]); }
			else { return false; }
		}
	}

	return A === B;
}
