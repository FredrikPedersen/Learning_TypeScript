namespace App {
    export interface IDraggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    } // IDraggable

    export interface IDragTarget {
        dragOverHandler(event: DragEvent): void;
        dropHandler(event: DragEvent): void;
        dragLeaveHandler(event: DragEvent): void;
    } // IDragTarget
} //namespace App
