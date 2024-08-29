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
    if (localStorage.length > 0){
        localStorage.removeItem("project" + projectIndex);
    }
}

export function addTOLocalStorage(projects){
    for (let i = 0 ; i < projects.length; i++){
        localStorage.setItem("project" + i, JSON.stringify(projects[i]));
    }
}

export function getLocalStorageItems(){
    let parsedProjects = [];
    for (let i = 0; i<  localStorage.length; i++){
        let project = JSON.parse(localStorage.getItem("project" + i));
        parsedProjects.push(project);
    };
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
        console.log(parsedProjects[i]);
        project_list.push(parsedProjects[i])
    };
}