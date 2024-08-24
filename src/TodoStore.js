export {project_list, today_list, upcoming_list };
import { projects } from "./projects";


const project_list = [];
const today_list = [];
const upcoming_list = [];



export function createProject(list, title){
    let project = new projects(title);
    list.push(project);
}