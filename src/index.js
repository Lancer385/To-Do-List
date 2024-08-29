import { constructFrom } from "date-fns/constructFrom";
import {project_list, all_todos} from "./TodoStore";
import { createProject } from "./TodoStore";
import "./style.css";
createProject(project_list, "project1")
console.log(project_list);
const inbox = document.querySelector("#inbox");
const content = document.querySelector("#content");
const projectsNode = document.querySelector("#projects");

// dialog for project and todo forms and showing todo descriptions
const dialog = document.createElement("dialog");
document.body.appendChild(dialog);

// Project DOM
const projectFrom = document.createElement("form");
const projectFromTitle = document.createElement("input");
const projectSubmit = document.createElement("button");
setAttributes(projectFrom, {
    id: "project-form",
    class: "From",
});
projectFromTitle.type = "text";
projectSubmit.type = "submit";
projectFromTitle.required = true;
projectFrom.appendChild(projectFromTitle);
projectFrom.appendChild(projectSubmit);



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
};
for (const [value, text] of Object.entries(priorities)){
    const option = document.createElement("option");
    option.value = value;
    option.textContent = text;
    todoPriority.appendChild(option);
};
todoDueDate.type = "date";
todoSubmit.type = "submit";
todoForm.required = true;
todoTitle.required = true;
todoDesc.required = true;
todoPriority.required = true;
todoForm.appendChild(todoTitle);
todoForm.appendChild(todoDesc);
todoForm.appendChild(todoPriority);
todoForm.appendChild(todoDueDate);
todoForm.appendChild(todoSubmit);




inbox.addEventListener("click", ()=> {
    resetActiveButtons();
    displayAllTodo();
});

projectFrom.addEventListener("submit", (e)=> {
    e.preventDefault();
    createProject(project_list, projectFromTitle.value)
    displayProjectDOM();
    projectFrom.reset();
    dialog.close();
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectIndex = document.querySelector(".active").dataset.index;
    project_list[projectIndex].createTask(todoTitle.value, todoDesc.value, todoPriority.value, todoDueDate.value);
    displayProjectTodos(projectIndex);
    todoForm.reset();
    dialog.close();
});







function displayProjectDOM(){
    removeAllChildren(projectsNode)
    for (let i = 0; i< project_list.length; i++){
        let project = document.createElement("button");
        project.dataset.index = i;
        project.classList = "projects"
        project.textContent = project_list[i].title;
        projectsNode.appendChild(project)
        project.addEventListener("click", (e) => {
            resetActiveButtons();
            e.target.classList.add('active')
            displayProjectTodos(parseInt(e.target.dataset.index));
        });
    };
    let addProject = document.createElement("button");
    addProject.textContent = "Add Project";
    addProject.id = "add-projects";
    projectsNode.appendChild(addProject)
    addProject.addEventListener("click",  ()=> {
        removeAllChildren(dialog);
        dialog.appendChild(projectFrom);
        dialog.showModal();
    });
};


function displayProjectTodos(projectIndex){
    removeAllChildren(content);
    for (let i = 0; i < project_list[projectIndex].tasks.length; i++){
        let todo = document.createElement("div");
        let todoBtn = document.createElement("button");
        todo.classList = "todos";
        todo.textContent = project_list[projectIndex].tasks[i].title;
        todoBtn.textContent = "content"
        todoBtn.dataset.index = i;
        todoBtn.addEventListener("click", () => {
            removeAllChildren(dialog);
            displayTodoInfo(projectIndex, i);
            dialog.showModal();
        } )
        todo.appendChild(todoBtn)
        content.appendChild(todo);
    };
    let addTodo = document.createElement("button");
    addTodo.textContent = "Add Todo";
    addTodo.id = "add-todo";
    content.appendChild(addTodo)
    addTodo.addEventListener("click",  ()=> {
        removeAllChildren(dialog);
        dialog.appendChild(todoForm);
        dialog.showModal();
    });
};


function displayAllTodo(){
    removeAllChildren(content);
    for (let i = 0; i < all_todos.length; i++){
        let todo = document.createElement("button");
        todo.textContent = all_todos[i].title;
        content.appendChild(todo);
    };
};


function displayTodoInfo(projectIndex, todoIndex){
    const container = document.createElement("div")
    const title = document.createElement("p")
    const desc = document.createElement("p");
    const date = document.createElement("p");
    title.textContent = `Title: ${project_list[projectIndex].tasks[todoIndex].title}`;
    desc.textContent =  `Description: ${project_list[projectIndex].tasks[todoIndex].desc}`;
    date.textContent = `DueDate: ${project_list[projectIndex].tasks[todoIndex].dueDate}`;
    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(date);
    dialog.appendChild(container);
}
// helper functions
function removeAllChildren(node){
    while (node.firstChild){
        node.removeChild(node.lastChild);
    };
};

function resetActiveButtons(){
    document.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
};

function setAttributes(element, attributes) {
    for(let key in attributes) {
      element.setAttribute(key, attributes[key]);
    };
};

displayProjectDOM()
displayAllTodo();