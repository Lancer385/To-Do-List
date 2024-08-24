import { tasks } from "./tasks";

export class projects {
    constructor (title) {
        this.title = title;
        this.tasks  = [];
    }
    createTask(title, desc, priority){
        let task = new tasks(title, desc, priority);
        this.tasks.push(task);
        if (this.tasks.length  > 1) {
            while(true){
                let taskIndex = this.tasks.indexOf(task);
                if (taskIndex === 0) {break;}
                if (task.priorityCheck(this.tasks, taskIndex)){
                    this.moveLeft(taskIndex)
                }
                else{
                    break;
                }
            }
        }
    }
    moveLeft(index){
        const movedElement = this.tasks.splice(index,1);
        this.tasks.splice(index - 1, 0, movedElement[0]);
    };
    moveRight(index){
        const movedElement = this.tasks.splice(index,1);
        this.tasks.splice(index + 1, 0, movedElement[0]);
    };
}


