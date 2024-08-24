import { tasks } from "./tasks";

export class projects {
    constructor (title) {
        this.title = title;
        this.tasks  = [];
    }
    createTask(title, desc, priority){
        let task = new tasks(title, desc, priority);
        this.tasks.push(task);
        // if we would have a task with the highest priority, it should always stay at the top.
        // so basically, after we create a new task, we check for the priority, is it higher than task that
        // comes before it? move it. until that condition becomes false, it will keep moving until it reaches the top.
        if (this.tasks.length  > 1) {
            while(true){
                let taskIndex = this.tasks.indexOf(task);
                if (taskIndex === 0) {break;}
                if (task.priorityCheckLeft(this.tasks, taskIndex)){
                    this.moveLeft(taskIndex)
                }
                else{
                    break;
                }
            }
        }
    }
    // to make things more flexible, we can also add a methods to move tasks around
    moveLeft(index){
        const movedElement = this.tasks.splice(index,1);
        this.tasks.splice(index - 1, 0, movedElement[0]);
    };
    moveRight(index){
        const movedElement = this.tasks.splice(index,1);
        this.tasks.splice(index + 1, 0, movedElement[0]);
    };
}


