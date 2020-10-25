/**
 * Note: All the code for this project is done in a single file due to the course itself haven't covered modules and
 * namespaces in TypeScript yet. Might refactor later as I get more experience with TypeScript.
 */

/* ----- Drag and Drop Functionality ----- */
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
} // Draggable

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
} // DragTarget

/* ----- State Management ----- */

enum ProjectStatus {Active, Finished}
type Listener<T> = (items: T[]) => void; //A listener is a function which takes in a list of projects and returns nothing

class Project {

    public id: string;

    constructor(public title: string, public description: string, public people: number, public status: ProjectStatus) {
        this.id = Math.random().toString();
    }
} // Project

abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFunction : Listener<T>): void {
        this.listeners.push(listenerFunction);
    }
}

class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static INSTANCE: ProjectState;

    //Private constructor to prevent direct instantiation and enforce singleton pattern
    private constructor() {super();}

    static getInstance(): ProjectState {
        if (this.INSTANCE) {
            return this.INSTANCE;
        }

        this.INSTANCE = new ProjectState();
        return this.INSTANCE;
    }

    addProject(title: string, description: string, numberOfPeople: number): void {
        const newProject = new Project(title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);

        this.listeners.forEach(listenerFunction => {
            listenerFunction(this.projects.slice()); //Passes a copy of the array to prevent mutating it in a different place
        })
    }
} // ProjectState

const projectState = ProjectState.getInstance();

/* ----- Validation ----- */

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    minValue?: number;
    maxValue?: number;
} // Validatable

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
} // validate

/* ----- Decorators ----- */

function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjustedDescriptor: PropertyDescriptor = {
        configurable: true,
        get() {
            return originalMethod.bind(this);
        }
    };

    return adjustedDescriptor;
} // Autobind

/*----- Component Classes ----- */

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected templateElement: HTMLTemplateElement;
    protected hostElement: T;
    protected newElement: U;

    protected constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId)! as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.newElement = importedNode.firstElementChild as U;

        if (newElementId) {
            this.newElement.id = newElementId;
        }

        this.attachToDOM(insertAtStart);
    }

    private attachToDOM(insertAtStart: boolean): void {
        this.hostElement.insertAdjacentElement(insertAtStart ? "afterbegin" : "beforeend", this.newElement);
    }

    protected abstract configure(): void;
    protected abstract renderContent?(): void;
} // Component

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable{

    private project: Project;

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    public dragStartHandler(event: DragEvent): void {
        console.log(event);
    }

    @Autobind
    public dragEndHandler(event: DragEvent): void {
        console.log("Drag end");
    }

    protected configure(): void {
        this.newElement.addEventListener("dragstart", this.dragStartHandler);
        this.newElement.addEventListener("dragend", this.dragEndHandler);
    }

    protected renderContent(): void {
        this.newElement.querySelector("h2")!.textContent = this.project.title;
        this.newElement.querySelector("h3")!.textContent = this.participantsString;
        this.newElement.querySelector("p")!.textContent = this.project.description;
    };

    get participantsString(): string {
        if (this.project.people === 1) {
            return "1 participant";
        } else {
            return `${this.project.people} participants`
        }
    }

} // ProjectItem

class ProjectList extends Component<HTMLDivElement, HTMLElement>{
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    protected configure(): void {
        projectState.addListener((projects: Project[]) => {
            this.assignedProjects = projects.filter(project => {
                if (this.type == "active") {
                    return project.status == ProjectStatus.Active
                }

                return project.status == ProjectStatus.Finished
            });
            this.renderProjects();
        });
    };

    protected renderContent(): void {
        this.newElement.querySelector("ul")!.id = `${this.type}-projects-list`;
        this.newElement.querySelector("h2")!.textContent = this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects(): void {
        const listElement = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement;
        listElement.innerHTML = ""; //Clear HTML element to prevent duplicate rendering

        this.assignedProjects.forEach(project => {
            new ProjectItem(this.newElement.querySelector("ul")!.id, project)
        })
    }
} // Project List

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super("project-input", "app", true, "user-input");
        this.configure();
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

    protected configure(): void {
        this.titleInputElement = this.newElement.querySelector("#title")! as HTMLInputElement;
        this.descriptionInputElement = this.newElement.querySelector("#description")! as HTMLInputElement;
        this.peopleInputElement = this.newElement.querySelector("#people")! as HTMLInputElement;

        this.newElement.addEventListener("submit", this.submitHandler);
    }

    protected renderContent(): void {};

    private clearInputs(): void {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }

    @Autobind
    private submitHandler(event: Event): void {
        event.preventDefault();
        const userInput = this.gatherUserInput();

        if(Array.isArray(userInput)) {
            const [title, description, people] = userInput;
            projectState.addProject(title, description, people);
            this.clearInputs();
        }
    }

} // Project Input

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");