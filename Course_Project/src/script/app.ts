interface Greetable {
    readonly name: string;

    greet(phrase: string): void;
}

class Person implements Greetable {
    name: string
    
    constructor(name: string) {
        this.name = name;
    }
    
    greet(phrase: string) {
        console.log(phrase + " " + this.name);
    }
}

let user1: Greetable;
user1 = new Person("Fredrik");
user1.greet("Hello There");