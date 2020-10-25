namespace App {
    export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
    } // class Component
} //namespace App