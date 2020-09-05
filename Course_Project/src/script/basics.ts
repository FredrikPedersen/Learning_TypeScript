const add = (value1: number, value2: number): number => {
    return value1 + value2;
};

//Manually assign a type if you are not initializing the variable at once, otherwise TypeScript understands what type
//the variable is supposed to be.
let value1: number;
value1 = 5;

const value2 = 3.1;

console.log(add(value1, value2));