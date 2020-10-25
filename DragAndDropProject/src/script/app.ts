/// <reference path="models/dragDrop.ts" />
/// <reference path="models/project.ts" />
/// <reference path="state/stateManagement.ts" />
/// <reference path="utility/validation.ts" />
/// <reference path="decorators/autobind.ts" />
/// <reference path="components/projectInput.ts" />
/// <reference path="components/projectList.ts" />

namespace App {

    new ProjectInput();
    new ProjectList("active");
    new ProjectList("finished");
}