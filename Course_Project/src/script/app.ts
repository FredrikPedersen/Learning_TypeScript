/* ----- Part 93 - 96 - Generics Intro ----- */
function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

//Using generics in the function, TypeScript understands that there are two specific types going in as parameters, in
//contrary to using object as the type of the parameters.
const mergedRedundant = merge<{name: string}, {age: number}>({name: "Fredrik"}, {age: 25});
const merged = merge({name: "Fredrik"}, {age: 25});
console.log(merged.name + " " + merged.age);


/* ----- Part 97 - Another Generic Functions ----- */

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


/* ----- Part 98 - The keyof constraint ----- */
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
}

const test = extractAndConvert({name: "Fredrik"}, "name");
console.log(test);

/* ---- Part 99 - Generic Classes ----- */

class DataStorage<T extends string | number | boolean> {

    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Fredrik");

/* Problems occur when using object as the class' type.
When trying to remove object with name Fredrik, you pass a new object and not the same object which was added to the storage.
It would work if the Fredrik-object was stored in a constant and then passed to the remove function.
Therefore, prevent the storage from working with anything but primitive types.

const objectStorage = new DataStorage<object>();
objectStorage.addItem({name: "Fredrik"});
objectStorage.addItem({name: "Nikia"});
objectStorage.removeItem({name: "Fredrik"});
console.log(objectStorage.getItems()); */
