export class tasks{
    constructor(title, desc, priority, dueDate){
        this.title =  title;
        this.desc = desc;
        this.priority = priority;
        this.dueDate = dueDate;
        this.stateCheck = false;
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
    toggleCheck(){
        this.stateCheck === true ?  this.stateCheck = false : this.stateCheck = true;
    }
}




