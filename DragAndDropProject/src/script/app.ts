/**
 * Note: All the code for this project is done in a single file due to the course itself haven't covered modules and
 * namespaces in TypeScript yet. Might refactor later as I get more experience with TypeScript.
 */

/* ----- State Management ----- */

enum ProjectStatus {Active, Finished}
type Listener = (items: Project[]) => void; //A listener is a function which takes in a list of projects and returns nothing

class Project {

    public id: string;

    constructor(public title: string, public description: string, public people: number, public status: ProjectStatus) {
        this.id = Math.random().toString();
    }
}

class ProjectState {
    private projects: Project[] = [];
    private listeners: Listener[] = [];
    private static INSTANCE: ProjectState;

    //Private constructor to prevent direct instantiation and enforce singleton pattern
    private constructor() {}

    static getInstance() {
        if (this.INSTANCE) {
            return this.INSTANCE;
        }

        this.INSTANCE = new ProjectState();
        return this.INSTANCE;
    }

    addListener(listenerFunction : Listener) {
        this.listeners.push(listenerFunction);
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        const newProject = new Project(title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);

        this.listeners.forEach(listenerFunction => {
            listenerFunction(this.projects.slice()); //Passes a copy of the array to prevent mutating it in a different place
        })
    }
}

const projectState = ProjectState.getInstance();

/* ----- Validation ----- */

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
}

function validate(validatables: Validatable[]) : boolean {
    let isValid = true;

    validatables.forEach(validatable => {
        if(validatable.required) {
            isValid = isValid && validatable.value.toString().trim().length !== 0;
        }

        if (validatable.minLength != null && typeof validatable.value === "string") {
            isValid = isValid && validatable.value.trim().length >= validatable.minLength;
        }

        if (validatable.maxLength != null && typeof validatable.value === "string") {
            isValid = isValid && validatable.value.trim().length <= validatable.maxLength;
        }

        if (validatable.minValue != null && typeof validatable.value === "number") {
            isValid = isValid && validatable.value >= validatable.minValue;
        }

        if (validatable.maxValue != null && typeof validatable.value === "number") {
            isValid = isValid && validatable.value <= validatable.maxValue;
        }
    });

    return isValid;
}

/* ----- Decorators ----- */

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };

    return adjustedDescriptor;
}

/*----- DOM Managing Classes ----- */

class ProjectList {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    sectionElement: HTMLElement;
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        this.templateElement = document.getElementById("project-list")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;
        this.sectionElement = document.getElementById("projects")! as HTMLElement;
        this.assignedProjects = [];

        const importedNode = document.importNode(this.templateElement.content, true);
        this.sectionElement = importedNode.firstElementChild as HTMLElement;
        this.sectionElement.id = `${this.type}-projects`;

        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });

        this.attachToDOM();
        this.renderContent();
    }

    private  renderProjects() {
        const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;

        this.assignedProjects.forEach(project => {
            const listItem = document.createElement("li");
            listItem.textContent =  project.title;
            listElement.appendChild(listItem);
        })
    }

    private renderContent() {
        this.sectionElement.querySelector("ul")!.id = `${this.type}-projects-list`;
        this.sectionElement.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private attachToDOM() {
        this.hostElement.insertAdjacentElement("beforeend", this.sectionElement);
    }
}

class ProjectInput {

    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
        this.hostElement = document.getElementById("app")! as HTMLDivElement;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.formElement = importedNode.firstElementChild as HTMLFormElement;
        this.formElement.id = "user-input";

        this.titleInputElement = this.formElement.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputElement = this.formElement.querySelector("#description")! as HTMLInputElement;
        this.peopleInputElement = this.formElement.querySelector("#people")! as HTMLInputElement;

        this.configure();
        this.attachToDOM();
    }

    private gatherUserInput(): [string, string, number] | undefined {
        const titleValidatable: Validatable = {
            value: this.titleInputElement.value,
            required: true
        };

        const descriptionValidatable: Validatable = {
            value: this.descriptionInputElement.value,
            required: true,
            minLength: 5
        };

        const peopleValidatable: Validatable = {
            value: +this.peopleInputElement.value,
            required: true,
            minValue: 2,
            maxValue: 5
        };

        if (!validate([titleValidatable, descriptionValidatable, peopleValidatable])) {
            alert("Invalid Input, please try again!");
            return;
        } else {
            return [titleValidatable.value.toString(), descriptionValidatable.value.toString(), +peopleValidatable.value];
        }
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

    private configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }

    private attachToDOM() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
} // Project Input

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");