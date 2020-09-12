abstract class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];

    protected constructor(protected readonly id: string, protected name: string) {
    }

    static createEmployee(name: string) {
        return {name: name}
    }

    abstract describe(this: Department): void;

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
    private static instance: AccountingDepartment;

    protected constructor(id: string, private reports: string[]) {
        super(id, "Accounting");
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (!this.instance) {
            this.instance = new AccountingDepartment("acc1", []);
        }
        return this.instance;
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

    describe(this: AccountingDepartment) {
        console.log("Accounting Department: " + this.id);
    }
}

const employee1 = Department.createEmployee("Fredrik");
console.log(employee1, + " ", Department.fiscalYear);
const accounting = AccountingDepartment.getInstance();

accounting.mostRecentReport = "Year End Report";
accounting.addReport("Something went wrong...");
console.log(accounting.mostRecentReport);

