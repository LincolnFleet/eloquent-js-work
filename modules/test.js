/**
 * Module with tools for testing.
 * @module modules/Test
 */
module.exports = { unit };

/**
 * Function to test a subject function against expected output.
 * @param {Object} test - {label, subject, inputArgs, expectedOutput}
 * @param {string} test.label - Name for specific test or test run.
 * @param {Function} test.subject - Function to be tested.
 * @param {*} test.inputArgs - Value or list of arguments to be passed to the subject.
 * @param {*} test.expectedOutput - Expected return value from subject when executed using inputArgs.
 * @return {Boolean} - Indicates true if test has passed and false if not.
 */
function unit({ label, subject, inputArgs, expectedOutput }) {
	// ensure inputArgs is an interable
	if (!(inputArgs instanceof Array)) inputArgs = new Array(inputArgs);

	const hasPassed = subject(...inputArgs) == expectedOutput;

	console.log(""); // line break for readability
	console.log(label + ":", hasPassed ? "PASS" : "FAIL");
	console.log("inputArgs: ", JSON.stringify(inputArgs));
	console.log("expected out: ", JSON.stringify(expectedOutput));
	!hasPassed && console.log("actual out: ", JSON.stringify(subject));
	console.log(""); // line break for readability

	return hasPassed;
};
