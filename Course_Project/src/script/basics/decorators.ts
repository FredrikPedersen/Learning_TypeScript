/* ----- Part 105 - 108: Intro to Decorators ----- */

// Conventions dictate decorator-functions start with upper-case names
// Constructor is an argument a Decorator receives when applied to a class
import instantiate = WebAssembly.instantiate;

function Logger(logString: string): Function {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

// The @-symbol is a special identifier Typescript recognizes to point to a decorator function.
// When multiple loggers are applied, they are executed bottom up. In this case WithTemplate runs first.
@Logger("LOGGING - PERSON")
class PersonWithDecorators {
    name: String = "Fredrik";

    constructor() {
    }
}

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

/* ----- Part 112: Returning and Changing a Class in A Decorator ----- */

// Note: Only Class, Method and Accessor-decorators may return values which are not ignored by TypeScript.
// Returns a new class with the template when the class is instantiated. Note how it extends the original class by
// extending the originalConstructor.
function WithTemplate(template: string, hookId: string) {
    return function<T extends {new(...args: any[]): {name: string} }> (originalConstructor: T) {

        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();

                const hookElement = document.getElementById(hookId);

                if (hookElement) {
                    hookElement.innerHTML = template;
                    hookElement.querySelector("h1")!.textContent = this.name;
                }
            }
        }
    };
}

@WithTemplate("<h1>My Person Object</h1>", "app")
class DecoratedWithReturnValue {

    name: string = "Fredrik";

    constructor() {
    }
}

const instantiatedClass: DecoratedWithReturnValue = new DecoratedWithReturnValue();

/* ----- Part 114: Creating an Autobind Decorator ----- */

// Decorator to always bind "this" to the object the called method belongs to
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return originalMethod.bind(this);
        },
    };

    return adjustedDescriptor;
}

class Printer {
    message = "This works";

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();
const button = document.querySelector("button")!;
button.addEventListener("click", printer.showMessage);

/* ----- Part 115 - 116: Validation With Decorators ----- */

interface ValidatorConfig {
    [property: string]: {
        [validateableProp: string]: string[] // ["required", "positive"]
    }
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propertyName]: ["required"]
    };
}

function PositiveNumber(target: any, propertyName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propertyName]: ["positiveNumber"]
    };
}

function validate(object: any) {
    const objectValidatorConfig = registeredValidators[object.constructor.name];

    if (!objectValidatorConfig) {
        return true;
    }

    let formIsValid = true;
    for (const property in objectValidatorConfig) {
        for (const validator of objectValidatorConfig[property]) {
            switch (validator) {
                case "required":
                    formIsValid = formIsValid && !!object[property];
                    break;
                case "positiveNumber":
                    formIsValid = formIsValid && object[property] > 0;
                    break;
            }
        }
    }

    return formIsValid;
}

class Course {

    @Required
    title: string;

    @PositiveNumber
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleInput = document.getElementById("title") as HTMLInputElement;
    const priceInput = document.getElementById("price") as HTMLInputElement;

    const title: string = titleInput.value;
    const price: number = +priceInput.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert("Invalid input, please try again!");
        return;
    }

    console.log(createdCourse);
});



















