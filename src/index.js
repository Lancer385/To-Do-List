import {project_list, all_todos} from "./TodoStore";
import { createProject } from "./TodoStore";
import "./style.css";

console.log(project_list);
const inbox = document.querySelector("#inbox");
const content = document.querySelector("#content");
const projectsNode = document.querySelector("#projects");

const dialog = document.createElement("dialog");
const projectFrom = document.createElement("form");
const projectFromTitle = document.createElement("input");
const confirm = document.createElement("button")
confirm.type = "submit";

projectFromTitle.type = "text";
projectFrom.id = "projectFrom";
projectFrom.class = "projectFrom";
projectFrom.appendChild(projectFromTitle);
projectFrom.appendChild(confirm)
document.body.appendChild(dialog);







inbox.addEventListener("click", ()=> {
    displayAllTodo();
})

projectFrom.addEventListener("submit", (e)=> {
    e.preventDefault();
    createProject(project_list, projectFromTitle.value)
    displayProjects();
    projectFrom.reset();
    dialog.close();
})

function displayAllTodo(){
    removeAllChildren(content);
    for (let i = 0; i< all_todos.length; i++){
        let todo = document.createElement("button");
        todo.textContent = all_todos[0].title;
        content.appendChild(todo);
    }
}
displayProjects();
function displayProjects(){
    removeAllChildren(projectsNode)
    for (let i = 0; i< project_list.length; i++){
        let project = document.createElement("button");
        project.dataset.index = i;
        project.textContent = project_list[i].title;
        projectsNode.appendChild(project)
    }
    let addProject = document.createElement("button");
    addProject.textContent = "Add Project";
    addProject.id = "add-projects";
    projectsNode.appendChild(addProject)
    addProject.addEventListener("click",  ()=> {
        removeAllChildren(dialog);
        dialog.appendChild(projectFrom);
        dialog.showModal();
    })
}

// helper functions
function removeAllChildren(node){
    while (node.firstChild){
        node.removeChild(node.lastChild);
    }
}


function setAttributes(element, attributes) {
    for(let key in attributes) {
      element.setAttribute(key, attributes[key]);
    }
  }