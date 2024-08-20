export {project_list};
import { createProject } from "./projects";
import { createTask } from "./task";

const project_list = {};
createProject(project_list, "project1", "project-title");
createTask(project_list["project1"], "task1", "task-title1", "description");
createTask(project_list["project1"], "task2", "task-title2", "description");
console.log(project_list)