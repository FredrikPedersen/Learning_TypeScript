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