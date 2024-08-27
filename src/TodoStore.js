export {project_list, all_todos };
import { projects } from "./projects";


const project_list = [];
const all_todos = [];

export function createProject(list, title){
    let project = new projects(title);
    list.push(project);
}