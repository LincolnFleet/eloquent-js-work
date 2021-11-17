/** Program Structure
 * 
 * expression: fragment of code that produces a value, can contain other expressions
 * statement: conclusive set of expressions, often ended with semicolon
 * side-effects: changes or effects on surrounding code/environment caused by a statement
 * binding (or) variable: a name that references a value. Vars which point to expressions actually point to the resulting value of the expression
 * environment: the full set of bindings in a program at a given point in time
 * control flow: a sequence of statements that can be executed in a program
 * 
 */

{/*
	Write a loop that makes seven calls to console.log to output the following triangle:
#
##
###
####
#####
######
#######
*/}

for (let x = 1; x <= 7; x++) {
	console.log(Array(x + 1).join("#"));
}

{/*
	Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead. When you have that working, modify your program to print "FizzBuzz", for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/}

for (let x = 1; x <= 100; x++) {
	console.log(`${x % 3 ? "" : "Fizz"}${x % 5 ? "" : "Buzz"}` || x);
}

{/*
	Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.
*/}

function makeChessboard(size) {
	let string = "";

	for (let i = 1; i <= size * size; i++) {
		const char = (i - Math.ceil(i / size)) % 2 ? " " : "#";
		string += i % size ? char : char + "\n";
	}

	return string;
}

console.log(makeChessboard(8));
