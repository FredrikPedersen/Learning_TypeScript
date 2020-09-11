class Department {

    name: string;

    constructor(name: string) {
        this.name = name;
    }

    describe(this: Department) {
        console.log("Department: " + this.name);
    }
}

const classInstance = new Department("Orakel");

classInstance.describe()