Functions

- "function" creates a binding that points to a value, which is a function
- 2 parts: parameters and body
	- parameters are the names of the arguments that the function takes
	- body is the code that the function runs
- "let" and "const" are local to block or expression they are declared in, and creates a scope
- "var" is local to the block (but not expression) it is declared in, and does not create a scope
- local bindings are recreated every time a function is called
- a closure is a function that references bindings from scopes outside the function
- single responsibility principle (SRP) - a function should only do one, specific thing. If the name of the function is obscure, it should probably be split into multiple functions
"A useful principle is to not add cleverness unless you are absolutely sure you’re going to need it. It can be tempting to write general “frameworks” for every bit of functionality you come across. Resist that urge. You won’t get any real work done—you’ll just be writing code that you never use." (I feel personally attacked.)
- side effect - an action performed by a function that affects a value, state, or action outside of the function's inner scope (or) any external effect caused by a function aside from it's returned value. ex. console.log() affects the stdout of the program
- pure function - a function that does not have side effects and does not depend on any external state or action. When called with the same arguments, it always produces the same result regardless of its environment.

