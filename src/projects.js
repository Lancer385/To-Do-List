import { tasks } from "./tasks";

export class projects{
    constructor (title) {
        this.title = title;
        this.task  = [];
    }
    createTask(title, desc){
        this.task.push(new tasks(title, desc));
    }
    moveLeft(index){
        const movedElement = this.task.splice(index,1);
        this.task.splice(index - 1, 0, movedElement[0]);
    };
    moveRight(index){
        const movedElement = this.task.splice(index,1);
        this.task.splice(index + 1, 0, movedElement[0]);
    };
}


