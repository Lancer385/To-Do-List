export {project_list};
import { projects } from "./projects";


const project_list = [];

export function createProject(list, title){
    let project = new projects(title);
    list.push(project);
}