import {project_list, all_todos} from "./TodoStore";
import { createProject } from "./TodoStore";
import { projects } from "./projects";
import { tasks } from "./tasks";
import "./style.css";
createProject(project_list, "project1")
console.log(project_list);
const inbox = document.querySelector("#inbox");
const content = document.querySelector("#content");
const projectsNode = document.querySelector("#projects");

// dialog for project and todo forms
const dialog = document.createElement("dialog");
document.body.appendChild(dialog);

// Project DOM
const projectFrom = document.createElement("form");
const projectFromTitle = document.createElement("input");
const projectSubmit = document.createElement("button")
setAttributes(projectFrom, {
    id: "project-form",
    class: "From",
});
projectFromTitle.type = "text";
projectSubmit.type = "submit";
projectFrom.appendChild(projectFromTitle);
projectFrom.appendChild(projectSubmit)



// todo DOM
const todoForm = document.createElement("form");
const todoTitle = document.createElement("input");
const todoDesc = document.createElement("textarea");
const todoPriority = document.createElement("select");
const todoDueDate = document.createElement("input");
const todoSubmit = document.createElement("button");

const priorities = {
    3: 'High',
    2: 'Moderate', 
    1: 'Low'
}
for (const [value, text] of Object.entries(priorities)){
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    todoPriority.appendChild(option);
}
todoDueDate.type = "date";
todoForm.appendChild(todoTitle);
todoForm.appendChild(todoDesc);
todoForm.appendChild(todoPriority);
todoForm.appendChild(todoDueDate);
todoForm.appendChild(todoSubmit);
todoSubmit.type = "submit";



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

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectIndex = document.querySelector(".active").dataset.index;
    project_list[projectIndex].createTask(todoTitle.value, todoDesc.value, todoPriority.value, todoDueDate.value);
    displayProjectTodos(projectIndex);
    todoForm.reset();
    dialog.close();
})


displayProjects();
function displayProjects(){
    removeAllChildren(projectsNode)
    for (let i = 0; i< project_list.length; i++){
        let project = document.createElement("button");
        project.dataset.index = i;
        project.textContent = project_list[i].title;
        projectsNode.appendChild(project)
        project.addEventListener("click", (e) => {
            document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active')
            displayProjectTodos(parseInt(e.target.dataset.index));
        })
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

function displayProjectTodos(index){
    removeAllChildren(content);
    for (let i = 0; i < project_list[index].tasks.length; i++){
        let todo = document.createElement("button");
        todo.textContent = project_list[index].tasks[i].title;
        content.appendChild(todo);
    }
    let addTodo = document.createElement("button");
    addTodo.textContent = "Add Todo";
    addTodo.id = "add-todo";
    content.appendChild(addTodo)
    addTodo.addEventListener("click",  ()=> {
        removeAllChildren(dialog);
        dialog.appendChild(todoForm);
        dialog.showModal();
    })
}
displayAllTodo();
function displayAllTodo(){
    removeAllChildren(content);
    for (let i = 0; i < all_todos.length; i++){
        let todo = document.createElement("button");
        todo.textContent = all_todos[i].title;
        content.appendChild(todo);
    }
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
