//See https://github.com/typestack/class-validator
import {IsNotEmpty, IsNumber, IsPositive} from "class-validator";

export class DataClass {

    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsPositive()
    age: number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    public getInfo(): string {
        return `My name is ${this.name} and I am ${this.age} years old!`;
    }
}