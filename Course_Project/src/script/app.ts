/* ----- Part 105 - 106: Intro to Decorators ----- */

// Conventions dictate decorator-functions start with upper-case names
function Logger(logString: string): Function {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

//The @-symbol is a special identifier Typescript recognizes to point to a decorator function.
@Logger("LOGGING - PERSON")
class PersonWithLogger {
    name: String = "Fredrik";

    constructor() {
        console.log("Creating person object...");
    }
}

const classWithDecorator = new PersonWithLogger();