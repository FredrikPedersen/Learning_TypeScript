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

/*----- Classes ----- */

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
        this.attach();
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
            console.log(title, description, people);
            this.clearInputs();
        }
    }

    private configure() {
        this.formElement.addEventListener("submit", this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
    }
}

const projectInput = new ProjectInput();