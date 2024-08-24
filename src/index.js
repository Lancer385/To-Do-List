export {project_list, today_list, upcoming_list };
import { projects } from "./projects";


const project_list = [];
const today_list = [];
const upcoming_list = [];
window.upcoming_list = upcoming_list;
window.today_list = today_list;
window.project_list = project_list;
window.createProject = createProject;

function createProject(list, title){
    let project = new projects(title);
    list.push(project);
}