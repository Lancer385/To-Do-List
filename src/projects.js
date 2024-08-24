import { tasks } from "./tasks";

export class projects {
    constructor (title) {
        this.title = title;
        this.tasks  = [];
    }
    createTask(title, desc, priority, dueDate){
        let task = new tasks(title, desc, priority, dueDate);
        if (!this.dateCheck()){
            console.log("Invalid date");
            return;
        }
        this.tasks.push(task);
        // if we would have a task with the highest priority, it should always stay at the top.
        // so basically, after we create a new task, we check for the priority, is it higher than task that
        // comes before it? move it. until that condition becomes false, it will keep moving until it reaches the top.
        if (this.tasks.length  > 1) {
            while(true){
                let taskIndex = this.tasks.indexOf(task);
                if (task.priorityCheckLeft(this.tasks, taskIndex)){
                    this.moveLeft(taskIndex)
                }
                else{
                    break;
                }
            }
        }
    }
    // to make things more flexible, we can also add methods to move tasks around
    // We also need to ensure that we don't move the task out of bounds, 
    // and not move it above a task with higher priority or vice-versa
    moveLeft(index){
        if (this.tasks[index].priorityCheckLeft(this.tasks, index) || this.tasks[index].priority === this.tasks[index - 1].priority){
            const movedElement = this.tasks.splice(index,1);
            this.tasks.splice(index - 1, 0, movedElement[0]);
        }
    };
    moveRight(index){
        if (this.tasks[index].priorityCheckRight(this.tasks, index) || this.tasks[index].priority === this.tasks[index + 1].priority){
            const movedElement = this.tasks.splice(index,1);
            this.tasks.splice(index + 1, 0, movedElement[0]);
        }
    };
}
