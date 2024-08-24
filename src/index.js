export {project_list};
import { projects } from "./projects";

const project_list = [];
window.project_list = project_list;
window.createProject = createProject;

function createProject(list, title){
    let project = new projects(title);
    list.push(project);
}