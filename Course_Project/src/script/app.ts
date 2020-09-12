interface Greetable {
    greet(phrase: string): void;
}

class Person implements Greetable {
    
    constructor(private name: string) {
    }
    
    greet(phrase: string) {
        console.log(phrase + " " + this.name);
    }
}

const fredrik = new Person("Fredrik");
fredrik.greet("Hello There");