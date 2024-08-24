import { isToday, isBefore, isAfter } from "date-fns";
import { today_list, upcoming_list } from ".";
import { is } from "date-fns/locale";
export class tasks{
    constructor(title, desc, priority, dueDate){
        this.title =  title;
        this.desc = desc;
        this.priority = priority;
        this.dueDate = dueDate
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
    dateCheck(){
        if (isBefore(this.dueDate,  new Date())) { return false;};
        if(isToday(this.dueDate)) {today_list.push(this);};
        if (isAfter(this.dueDate, new Date())) {upcoming_list.push(this)};
    };
}




