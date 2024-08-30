import { tasks } from "./tasks";
import { assignMethodsToObjects } from "./TodoStore";
import { project_list } from "./TodoStore";
export class projects {
    constructor (title) {
        this.title = title;
        this.tasks  = [];
    }
    createTask(title, desc, priority, dueDate){
        let task = new tasks(title, desc, priority, dueDate);
        this.tasks.push(task);
        let parsedProject = assignMethodsToObjects();
        let indexOfProject = project_list.indexOf(this);
        parsedProject[indexOfProject].tasks.push(task)
        localStorage.setItem("projects", JSON.stringify(parsedProject));
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
    removeTask(taskIndex){
        this.tasks.splice(taskIndex,1)
    }
    // to make things more flexible, we can also add methods to move tasks around
    // We also need to ensure that we don't move the task out of bounds, 
    // and not move it above a task with higher priority or vice-versa
    // Note: This function is currently unused for the UI.
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
