class Department {

    private employees: string[] = [];

    //Name and id is initialized and added as fields to the class here
    //With the readonly tag, id cannot be modified after being initialized.
    constructor(private readonly id: string, private name: string) {
    }

    describe(this: Department) {
        console.log("Department: " + this.id + " " + this.name);
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

const classInstance = new Department("d1", "Orakel");
classInstance.addEmployee("Fredrik");
classInstance.addEmployee("Ana-Maria");

classInstance.printEmployeeInformation()
classInstance.describe()