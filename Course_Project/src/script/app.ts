class Department {

    private employees: string[] = [];

    constructor(private name: string) { //Name is initialized and added as field to the class here
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