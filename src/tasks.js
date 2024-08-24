export class tasks{
    constructor(title, desc, priority){
        this.title =  title;
        this.desc = desc;
        this.priority = priority;
    }
    priorityCheck(taskList, index){
        if (this.priority > taskList[index - 1].priority){
            return true;
        }
    }
}




