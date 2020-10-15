//Samples of declaring datatypes of classes that utilizes generics.
const names: Array<string> = ["Hello"];

const promise: Promise<string> = new Promise((resolve) => {
   setTimeout(() => {
       resolve("This is done!");
   }, 2000);
});