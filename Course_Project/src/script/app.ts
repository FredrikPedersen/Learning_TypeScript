import "reflect-metadata" //Needs to be a global import in the entry point. Needs a webpack setup to work like this.
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {DataClass} from "./classTransformer/dataClass.js";

const dataFromServer = [
    {name: "Fredrik", age: 26},
    {name: "Nikita", age: 24}
];

/* Manual way of converting retrieved data into TS class
const loadedData = dataFromServer.map(data => {
    return new DataClass(data.name, data.age);
}); */

const newData = new DataClass("", -26);
validate(newData).then(errors => {
    //This function always goes into the .then-block, even if there are errors
    if (errors.length > 0) {
        console.error("VALIDATION ERRORS!");
        console.error(errors);
    }

    console.log(newData.getInfo());
});

//See https://github.com/typestack/class-transformer
const loadedData = plainToClass(DataClass, dataFromServer); //usage of class-transformer

console.log(loadedData);