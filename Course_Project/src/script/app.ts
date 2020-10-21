/* ----- Part 105 - A First Class Decorator ----- */

// Conventions dictate decorator-functions start with upper-case names
function Logger(constructor: Function) {
    console.log("Logging");
    console.log(constructor);
}

//The @-symbol is a special identifier Typescript recognizes to point to a decorator function.
@Logger
class PersonWithLogger {
    name: String = "Fredrik";

    constructor() {
        console.log("Creating person object...");
    }
}

const classWithDecorator = new PersonWithLogger();