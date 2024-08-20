class projects{
    constructor (title) {
        this.title = title;
        this.tasks  = {};
    }
}

export function createProject(list, name, title){
    list[name] = new projects(title);
}

