import "reflect-metadata" //Needs to be a global import in the entry point. Needs a webpack setup to work like this.
import { plainToClass} from "class-transformer";
import {DataClass} from "./classTransformer/dataClass.js";

const dataFromServer = [
    {name: "Fredrik", age: 26},
    {name: "Nikita", age: 24}
];

/* Manual way of converting retrieved data into TS class
const loadedData = dataFromServer.map(data => {
    return new DataClass(data.name, data.age);
}); */

//See https://github.com/typestack/class-transformer
const loadedData = plainToClass(DataClass, dataFromServer); //usage of class-transformer

console.log(loadedData);