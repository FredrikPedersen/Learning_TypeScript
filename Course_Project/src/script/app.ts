function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

//Using generics in the function, TypeScript understands that there are two specific types going in as parameters, in
//contrary to using object as the type of the parameters.
const mergedRedundant = merge<{name: string}, {age: number}>({name: "Fredrik"}, {age: 25});
const merged = merge({name: "Fredrik"}, {age: 25});
console.log(merged.name + " " + merged.age);