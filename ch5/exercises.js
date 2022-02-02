const { Test, Util } = require("../modules/index");
const SCRIPTS = require("./data.json");

// Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

// Your code here.

function flatten(...args) {
	return args.reduce((acc, current) => {
		if (current instanceof Array) {
			current = flatten(...current);
		}
		return acc.concat(current);
	}, []);
}

Test.unit({
	label: 'flatten 1',
	subject: flatten,
	params: [[1, 2, 3], [4, 5], [6], 7],
	expectedOutput: [1, 2, 3, 4, 5, 6, 7],
});


// Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.

function loop(val, test, update, body) {
	if (!test(val)) return;
	body(val);
	loop(update(val), test, update, body);
}

Test.unit({
	label: 'loop 1',
	subject: loop,
	params: [3, (n) => n > 0, (n) => n - 1, console.log],
	expectedOutput: undefined,
})

// Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method.

function every(list, testFn) {
	for (let item of list) {
		if (!testFn(item)) {
			return false;
		}
	}
	return true;
}

Test.unit({
	label: 'every 1',
	subject: every,
	params: [[1, 2, 3], (n) => n < 10],
	expectedOutput: true
});

Test.unit({
	label: 'every 2',
	subject: every,
	params: [[2, 4, 16], (n) => n < 10],
	expectedOutput: false
});

Test.unit({
	label: 'every 3',
	subject: every,
	params: [[], (n) => n < 10],
	expectedOutput: true
});

// Write a function that computes the dominant writing direction in a string of text. The dominant direction is the direction of a majority of the characters that have a script associated with them.

{/* SCRIPTS data set structure
	{
		name: "Coptic",
		ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
		direction: "ltr",
		year: -200,
		living: false,
		link: "https://en.wikipedia.org/wiki/Coptic_alphabet"
	}
*/}

function characterScript(code) {
	for (let script of SCRIPTS) {
		if (script.ranges.some(([from, to]) => code >= from && code < to)) {
			return script;
		}
	}
	return { name: "undefined", living: false };
}

function dominantDirection(text) {
	const counts = Util.countByCategory({
		items: text,
		categorizeFn: (char) => characterScript(char.codePointAt(0)).direction,
		order: "desc"
	});
	return counts[0].category;
}

Test.unit({
	label: 'dominantDirection 1',
	subject: dominantDirection,
	params: "Hello!",
	expectedOutput: 'ltr'
})

Test.unit({
	label: 'dominantDirection 2',
	subject: dominantDirection,
	params: "Hey, مساء الخير",
	expectedOutput: 'rtl'
})
