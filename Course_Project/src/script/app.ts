//Use of Intersection Types and Interfaces to create the same solution.
type TAdmin = {
    name: string;
    privileges: string[];
};

type TEmployee = {
    name: string;
    startDate: Date;
};

type TElevatedEmployee = TAdmin & TEmployee;

interface IAdmin {
    name: string;
    privileges: string[];
}

interface IEmployee {
    name: string;
    startDate: Date;
}

interface IElevatedEmployee extends IAdmin, IEmployee {

}

const employee: TElevatedEmployee = {
    name: "Fredrik",
    privileges: ["create", "read", "update", "delete"],
    startDate: new Date()
}

/* ----------------------------------- */

// @ts-ignore
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// @ts-ignore
const add = (a: Combinable, b: Combinable) => {
    if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
    }
    return a + b;
};

type TUnknownEmployee = TEmployee | TAdmin;

const printEmployeeInformation = (employee: TUnknownEmployee) => {
    console.log("Name " + employee.name);

    if ("privileges" in employee) {
        console.log(employee.privileges);
    }

    if ("startDate" in employee) {
        console.log(employee.startDate);
    }
}

printEmployeeInformation(employee);

/* ------------------------- */

class Car {
    drive() {
        console.log("Driving...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...")
    }

    loadCargo() {
        console.log("Loading cargo...");
    }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();

const useVehicle = (vehicle: Vehicle) => {
    vehicle.drive();

    if (vehicle instanceof Truck) {
        vehicle.loadCargo();
    }
};

useVehicle(v1);
useVehicle(v2);

