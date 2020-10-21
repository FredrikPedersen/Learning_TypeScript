/* ----- Part 105 - 108: Intro to Decorators ----- */

// Conventions dictate decorator-functions start with upper-case names
// Constructor is an argument a Decorator receives when applied to a class
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

/* ----- Part 109 and 110: Property, Accessor and Parameter Decorators ----- */

// target and propertyName are arguments a Decorator receives when applied to a class property
function PropertyLogger(target: any, propertyName: string | symbol) {
    console.log("Property Decorator");
    console.log(target);
    console.log(propertyName);
}

// target, name and descriptor are arguments a Decorator receives when applied to an accessor
function AccessorLogger(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function MethodLogger(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log("Method decorator!");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}

function ParameterLogger(target: any, name: string | Symbol, position: number) {
    console.log("Parameter decorator!");
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {

    @PropertyLogger
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this._price = price;
    }

    @MethodLogger
    getPriceWithTax(@ParameterLogger tax: number) {
        return this._price * (1 + tax);
    }

    @AccessorLogger
    set price(price: number) {
        if (price > 0) {
            this._price = price;
        } else {
            throw new Error("Invalid price - should be positive!");
        }
    }
}

