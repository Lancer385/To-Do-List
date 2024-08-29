export {project_list};
import { projects } from "./projects";
import { tasks } from "./tasks";


const project_list = [];

export function createProject(list, title){
    let project = new projects(title);
    list.push(project);
    addTOLocalStorage(list);
}

export function removeProject(projectIndex){
    project_list.splice(projectIndex,1)
        let parsedProjects = assignMethodsToObjects();
        if (Array.isArray(parsedProjects)){
            parsedProjects.splice(projectIndex,1);
            localStorage.setItem("projects", JSON.stringify(parsedProjects));
        };
  
};

export function addTOLocalStorage(projects){
        localStorage.setItem("projects", JSON.stringify(projects));
};

export function getLocalStorageItems(){
        let parsedProjects = assignMethodsToObjects();
        if (Array.isArray(parsedProjects)){
            project_list.push(...parsedProjects);
        };
}

export function assignMethodsToObjects(){
    if (localStorage.length > 0){
        let parsedProjects = JSON.parse(localStorage.getItem("projects"));
            for (let i = 0; i< parsedProjects.length; i++){
                let methods = Object.getOwnPropertyNames(projects.prototype).filter(name => name !== 'constructor');
                methods.forEach(name => {
                    parsedProjects[i][name] = projects.prototype[name];
                });
                for (let j = 0;  j < parsedProjects[i].tasks.length; j++){
                    let methods = Object.getOwnPropertyNames(tasks.prototype).filter(name => name !== 'constructor');
                    methods.forEach(name => {
                        parsedProjects[i].tasks[j][name] = tasks.prototype[name];
                    });
                }
                
        };
        return parsedProjects;
    };
    
}