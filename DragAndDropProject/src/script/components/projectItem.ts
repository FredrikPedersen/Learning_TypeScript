import {IDraggable} from "../models/dragDrop.js";
import {Component} from "./baseComponent.js";
import {Project} from "../models/project.js";
import {Autobind} from "../decorators/autobind.js";

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements IDraggable {

    private project: Project;

    constructor(hostId: string, project: Project) {
        super("single-project", hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    public dragStartHandler(event: DragEvent): void {
        event.dataTransfer!.setData("text/plain", this.project.id);
        event.dataTransfer!.effectAllowed = "move";
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

} // class ProjectItem