class tasks{
    constructor(title, desc){
        this.title =  title;
        this.desc = desc;
    }
}

export function createTask(project, name, title, desc){
     project.tasks[name] = new tasks(title, desc);
}