import {Project, ProjectStatus} from "../models/project";

type Listener<T> = (items: T[]) => void; //A listener is a function which takes in a list of projects and returns nothing

abstract class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFunction: Listener<T>): void {
        this.listeners.push(listenerFunction);
    }
} // class State

export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static INSTANCE: ProjectState;

    //Private constructor to prevent direct instantiation and enforce singleton pattern
    private constructor() {
        super();
    }

    static getInstance(): ProjectState {
        if (this.INSTANCE) {
            return this.INSTANCE;
        }

        this.INSTANCE = new ProjectState();
        return this.INSTANCE;
    }

    public moveProject(projectId: string, newStatus: ProjectStatus): void {
        const project = this.projects.find(project => project.id === projectId);

        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    public addProject(title: string, description: string, numberOfPeople: number): void {
        const newProject = new Project(title, description, numberOfPeople, ProjectStatus.Active);
        this.projects.push(newProject);

        this.listeners.forEach(listenerFunction => {
            listenerFunction(this.projects.slice()); //Passes a copy of the array to prevent mutating it in a different place
        })
    }

    private updateListeners() {
        this.listeners.forEach(listenerFunction => {
            listenerFunction(this.projects.slice());
        })
    }
} // class ProjectState

export const projectState = ProjectState.getInstance();
