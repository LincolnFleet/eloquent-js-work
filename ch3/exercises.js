{/* Write a function "min" that takes two arguments and returns their minimum. */ }

function min(a, b) {
	return a < b ? a : b;
}

{/* Write a function "isEven" that takes a single numeric argument and returns true if the number is even and false otherwise. */ }

function isEven(num) {
	if (num === 0 || num === -0) { return true; }
	else if (num % 2 === 0 || num % 2 === -0) { return true; }
	else { return false; }
}

{/* Write a function countBs that takes a string as its only argument and returns a number that indicates how many uppercase “B” characters there are in the string. Next, write a function called countChar that behaves like countBs, except it takes a second argument that indicates the character that is to be counted (rather than counting only uppercase “B” characters).*/ }

function countBs(str) {
	let count = 0
	for (let i = 0; i < str.length; i++) {
		if (str[i] === 'B') { count++; }
	}
	return count;
}

function countChar(str, char) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === char) { count++; }
	}
	return count;
}
