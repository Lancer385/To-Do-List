import { today_list, upcoming_list, project_list } from "./TodoStore";
import { createProject } from "./TodoStore";

window.upcoming_list = upcoming_list;
window.today_list = today_list;
window.project_list = project_list;
window.createProject = createProject;