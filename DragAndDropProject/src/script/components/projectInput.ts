/// <reference path="baseComponent.ts" />

namespace App {

    export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{

        titleInputElement: HTMLInputElement;
        descriptionInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            super("project-input", "app", true, "user-input");
            this.configure();
        }

        private gatherUserInput(): [string, string, number] | undefined {
            const titleValidatable: IValidatable = {
                value: this.titleInputElement.value,
                required: true
            };

            const descriptionValidatable: IValidatable = {
                value: this.descriptionInputElement.value,
                required: true,
                minLength: 5
            };

            const peopleValidatable: IValidatable = {
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

    } // class ProjectInput
} // namespace App