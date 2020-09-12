interface Named {
    readonly name: string;
}

interface Greetable extends Named {
    greet(phrase?: string): void; //? annotates optional values
}

class Person implements Greetable {
    name: string

    constructor(name: string) {
        this.name = name;
    }

    greet() {
        console.log("Hello There! My name is " + this.name);
    }
}

let user1: Greetable;
user1 = new Person("Fredrik");
user1.greet();