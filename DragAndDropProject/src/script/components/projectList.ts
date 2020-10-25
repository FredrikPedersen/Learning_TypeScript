import {Component} from "./baseComponent.js";
import {IDragTarget} from "../models/dragDrop.js";
import {Project, ProjectStatus} from "../models/project.js";
import {Autobind} from "../decorators/autobind.js";
import {projectState} from "../state/stateManagement.js";
import {ProjectItem} from "./projectItem.js";

export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements IDragTarget {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
        super("project-list", "app", false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @Autobind
    public dragOverHandler(event: DragEvent): void {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            event.preventDefault(); // The default functionality is to NOT allow dropping
            const listElement = this.newElement.querySelector("ul")! as HTMLUListElement;
            listElement.classList.add("droppable");
        }
    }

    @Autobind
    public dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData("text/plain");
        projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished)
    }

    @Autobind
    public dragLeaveHandler(event: DragEvent): void {
        const listElement = this.newElement.querySelector("ul")! as HTMLUListElement;
        listElement.classList.remove("droppable");
    }

    protected configure(): void {
        this.newElement.addEventListener("dragover", this.dragOverHandler);
        this.newElement.addEventListener("dragleave", this.dragLeaveHandler);
        this.newElement.addEventListener("drop", this.dropHandler);


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
} // class ProjectList