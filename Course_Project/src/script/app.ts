class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(private readonly id: string, public name: string) {
    }

    static createEmployee(name: string) {
        return {name: name}
    }

    describe(this: Department) {
        console.log(`Department (${this.id}): ${this.name}`);
    }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class AccountingDepartment extends Department {

    private lastReport: string;

    constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    addEmployee(name: string) {
        if (name === "Fredrik") {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report found.");
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }
}

const employee1 = Department.createEmployee("Fredrik");
console.log(employee1, + " ", Department.fiscalYear);
const accounting = new AccountingDepartment("d2", []);

accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);

