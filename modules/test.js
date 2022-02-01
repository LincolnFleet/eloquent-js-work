/**
 * Module with tools for testing.
 * @module modules/Test
 */
module.exports = { unit };

/**
 * Function to test a subject function against expected output.
 * @param {Object} test - {label, subject, params, expectedOutput}
 * @param {string} test.label - Name for specific test or test run.
 * @param {Function} test.subject - Function to be tested.
 * @param {*} test.params - Value or list of arguments to be passed to the subject.
 * @param {*} test.expectedOutput - Expected return value from subject when executed using params.
 * @return {Boolean} - Indicates true if test has passed and false if not.
 */
function unit({ label, subject, params, expectedOutput }) {
	console.log(""); // line break for readability

	// ensure params is an interable
	if (!(params instanceof Array)) params = new Array(params);
	const actualOutput = subject(...params);
	const hasPassed = actualOutput === expectedOutput;

	hasPassed
		? console.log(label + ": " + "%cPass", "color:blue;")
		: console.log(label + ": " + "%cFAIL", "color:orange;");
	// console.log(label + ":", hasPassed ? "PASS" : "FAIL");
	console.log("params:", params);
	console.log("expected out:", expectedOutput);
	!hasPassed && console.log("actual out:", actualOutput);

	console.log(""); // line break for readability
	return hasPassed;
};
