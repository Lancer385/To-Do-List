export class tasks{
    constructor(title, desc, priority){
        this.title =  title;
        this.desc = desc;
        this.priority = priority;
    }
    priorityCheckLeft(taskList, index){
        if (index === 0){ return false}
        if (this.priority > taskList[index - 1].priority){
            return true;
        }
    }
    priorityCheckRight(taskList, index){
        if (index < taskList.length) {return false}
        if (this.priority < taskList[index + 1].priority){
            return true;
        }
    }
}




