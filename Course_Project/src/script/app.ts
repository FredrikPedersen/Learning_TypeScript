/* ----- Part 93 - 96 ----- */
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

//Using generics in the function, TypeScript understands that there are two specific types going in as parameters, in
//contrary to using object as the type of the parameters.
const mergedRedundant = merge<{name: string}, {age: number}>({name: "Fredrik"}, {age: 25});
const merged = merge({name: "Fredrik"}, {age: 25});
console.log(merged.name + " " + merged.age);


/* ----- Part 97 ----- */

//Creating an interface to guarantee that the type we get in have a length property
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText: string = "Got no value";

    if (element.length === 1) {
        descriptionText = "Got 1 element"
    } else  if(element.length > 1) {
        descriptionText = "Got " + element.length + " elemnts";
    }
    return [element, descriptionText];
}

console.log(countAndDescribe("Hello There!"));


/* ----- Part 98 ----- */
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

const test = extractAndConvert({name: "Fredrik"}, "name");
console.log(test);