/* ----- Part 105 - 108: Intro to Decorators ----- */

// Conventions dictate decorator-functions start with upper-case names
function Logger(logString: string): Function {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function (constructor: any) {
        const hookElement = document.getElementById(hookId);
        const person = new constructor();

        if (hookElement) {
            hookElement.innerHTML = template;
            hookElement.querySelector("h1")!.textContent = person.name;
        }
    }
}

// The @-symbol is a special identifier Typescript recognizes to point to a decorator function.
// When multiple loggers are applied, they are executed bottom up. In this case WithTemplate runs first.
@Logger("LOGGING - PERSON")
@WithTemplate("<h1>My Person Object</h1>", "app")
class PersonWithDecorators {
    name: String = "Fredrik";

    constructor() {
        console.log("Creating person object...");
    }
}

const classWithDecorator = new PersonWithDecorators();