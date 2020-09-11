class Department {

    private name: string;
    private employees: string[] = [];

    constructor(name: string) {
        this.name = name;
    }

    describe(this: Department) {
        console.log("Department: " + this.name);
        console.log("Employees: " + this.employees);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

const classInstance = new Department("Orakel");
classInstance.addEmployee("Fredrik");
classInstance.addEmployee("Ana-Maria");

classInstance.printEmployeeInformation()
classInstance.describe()