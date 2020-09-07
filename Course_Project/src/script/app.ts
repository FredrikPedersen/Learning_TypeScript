class Department {

    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

const classInstance = new Department("Orakel");
console.log(classInstance);