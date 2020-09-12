const addNumbers = (value1: number, value2: number): number => {
    return value1 + value2
};

const printMessage = (message: string): void => {
    console.log(message);
};

const addAndHandle = (value1: number, value2: number, callback: (num: number) => void ) => {
    const result = value1 + value2;
    callback(result);
};

printMessage("This functions does not return anything!");


let combineValues: (a: number, b: number) => number;
combineValues = addNumbers;

console.log(combineValues(3,4));

addAndHandle(10, 20, (result) => {
    console.log(result);
});