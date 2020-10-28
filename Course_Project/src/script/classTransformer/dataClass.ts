export class DataClass {

    name: string;
    age: number;

    constructor(name:string, age:number) {
        this.name = name;
        this.age = age;
    }

    public getInfo(): string {
        return `My name is ${this.name} and I am ${this.age} years old!`;
    }
}