import {project_list, removeProject, getLocalStorageItems} from "./TodoStore";
import { format, isWithinInterval, isToday } from "date-fns";
import { createProject } from "./TodoStore";
import "./style.css";






const inbox = document.querySelector("#inbox");
const today = document.querySelector("#today");
const week = document.querySelector("#week");
const content = document.querySelector("#content");
const projectsNode = document.querySelector("#projects");


inbox.textContent = "All Todos";
today.textContent = "Today";
week.textContent = "Week";





// dialog for project and todo forms and showing todo descriptions
const dialog = document.createElement("dialog");
document.body.appendChild(dialog);


// Project DOM
const projectFrom = document.createElement("form");
const projectFromTitle = document.createElement("input");
const projectSubmit = document.createElement("button");
const projectCancelBtn = document.createElement("button");

setAttributes(projectFrom, {
    id: "project-form",
    class: "From",
});
setAttributes(projectFromTitle, {
    name: "title",
    type: "text",
})
projectCancelBtn.textContent = "Cancel";
projectSubmit.type = "submit";
projectFromTitle.required = true;
projectFrom.appendChild(projectFromTitle);
projectFrom.appendChild(projectSubmit);
projectFrom.appendChild(projectCancelBtn);

// todo DOM
const todoForm = document.createElement("form");
const todoTitle = document.createElement("input");
const todoDesc = document.createElement("textarea");
const todoPriority = document.createElement("select");
const todoDueDate = document.createElement("input");
const todoSubmit = document.createElement("button");
const todoCancelBtn = document.createElement("button");

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
setAttributes(todoForm, {
    id: "todo-form",
    class: "From",
});
setAttributes(todoDueDate, {
    name: "date",
    type: "date",
    min: `${format(new Date(), 'yyyy-MM-dd')}`,
    value: `${format(new Date(), 'yyyy-MM-dd')}`
});
setAttributes(todoTitle, {
    name: "title",
    type: "text",
    required: true,
    placeholder: "Title: e.g., do laundry"
});
setAttributes(todoDesc, {
    name: "desc",
    required: true,
    placeholder: "Description: e.g., there's a lot of dirty clothes"
})
todoSubmit.type = "submit";
todoCancelBtn.textContent = "Cancel"
todoForm.required = true;   
todoPriority.required = true;
todoForm.appendChild(todoTitle);
todoForm.appendChild(todoDesc);
todoForm.appendChild(todoPriority);
todoForm.appendChild(todoDueDate);
todoForm.appendChild(todoCancelBtn)
todoForm.appendChild(todoSubmit);




inbox.addEventListener("click", ()=> {
    resetActiveButtons();
    displayAllTodo();
});

today.addEventListener("click", () => {
    resetActiveButtons();
    displayTodayTodos();
})

week.addEventListener("click", () => {
    resetActiveButtons();
    displayWeekTodos();
})

projectFrom.addEventListener("submit", (e)=> {
    e.preventDefault();
    createProject(project_list, projectFromTitle.value)
    displayProjectDOM();
    projectFrom.reset();
    dialog.close();
});

projectCancelBtn.addEventListener("click",  (e)=> {
    e.preventDefault()
    dialog.close();
});

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const projectIndex = document.querySelector(".active").dataset.index;
    project_list[projectIndex].createTask(todoTitle.value, todoDesc.value, parseInt(todoPriority.value), todoDueDate.value);
    localStorage.setItem("project" + projectIndex, JSON.stringify(project_list[projectIndex]));
    displayProjectTodos(projectIndex);
    todoForm.reset();
    dialog.close();
});


todoCancelBtn.addEventListener("click",  (e)=> {
    e.preventDefault();
    dialog.close();
});



function displayProjectDOM(){
    removeAllChildren(projectsNode)
    for (let i = 0; i< project_list.length; i++){
        let project = document.createElement("div");
        let projectBtn = document.createElement("button");
        let removeBtn = document.createElement("button");
        projectBtn.dataset.index = i;
        project.classList = "projects"
        projectBtn.textContent = project_list[i].title;
        projectBtn.classList = "view"
        removeBtn.textContent = "Delete";
        removeBtn.classList = "remove"
        project.appendChild(projectBtn);
        project.appendChild(removeBtn);
        projectsNode.appendChild(project)
        projectBtn.addEventListener("click", (e) => {
            resetActiveButtons();
            e.target.classList.add('active')
            displayProjectTodos(parseInt(e.target.dataset.index));
        });
        removeBtn.addEventListener("click", (e) => {
            resetActiveButtons();
            removeProjectDOM(parseInt(i));
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

function removeProjectDOM(projectIndex){
    removeProject(projectIndex);
    removeAllChildren(projectsNode);
    removeAllChildren(content);
    displayProjectDOM();
    displayAllTodo();
}



function displayAllTodo(){
    removeAllChildren(content);
    for (let i = 0; i < project_list.length; i++){
        for  (let j = 0; j < project_list[i].tasks.length; j++){
            addTodoContent(i, j);
        };
    };
    resetActiveButtons();
    inbox.classList = "active"
}

function displayTodayTodos(){
    removeAllChildren(content);
    for (let i = 0; i < project_list.length; i++){
        for  (let j = 0; j < project_list[i].tasks.length; j++){
            if( isToday(project_list[i].tasks[j].dueDate)){
                addTodoContent(i, j);
            };
        };
    };
    today.classList = "active"
};

function displayWeekTodos(){
    removeAllChildren(content);
    for (let i = 0; i < project_list.length; i++){
        for (let j = 0; j < project_list[i].tasks.length; j++){
            let targetDate = project_list[i].tasks[j].dueDate;
            let weekInterval = {
                start: format(new Date,  'yyyy-MM-dd'),
                end : format(new Date,  'yyyy-MM-dd'),
            };
            if (isWithinInterval(targetDate,  weekInterval)){
                addTodoContent(i, j);
            };
        };
    };
    week.classList = "active"
};

function displayProjectTodos(projectIndex){
    removeAllChildren(content);
    for (let i = 0; i < project_list[projectIndex].tasks.length; i++){
        addTodoContent(projectIndex, i);
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


function removeProjectTodos(projectIndex, todoIndex){
    let parsedProject = JSON.parse(localStorage.getItem("project" + projectIndex));
    parsedProject.tasks.splice(todoIndex, 1);
    localStorage.setItem("project" + projectIndex, JSON.stringify(parsedProject));
    project_list[projectIndex].removeTask(todoIndex);
    let child = document.querySelector(`div[data-index="${todoIndex}"]`)
    child.remove();
}


function displayTodoInfo(projectIndex, todoIndex){
    const container = document.createElement("div")
    const title = document.createElement("p")
    const desc = document.createElement("p");
    const date = document.createElement("p");
    const closeBtn = document.createElement("button")
    title.textContent = `Title: ${project_list[projectIndex].tasks[todoIndex].title}`;
    desc.textContent =  `Description: ${project_list[projectIndex].tasks[todoIndex].desc}`;
    date.textContent = `DueDate: ${project_list[projectIndex].tasks[todoIndex].dueDate}`;
    closeBtn.textContent = "Close"
    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(date);
    container.appendChild(closeBtn);
    dialog.appendChild(container);
    closeBtn.addEventListener("click", () => {
        dialog.close();
    });
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

function addTodoContent(projectIndex, todoIndex){
    let todo = document.createElement("div");
    let todoBtn = document.createElement("button");
    let removeBtn = document.createElement("button");
    todo.classList = "todos";
    todo.textContent = project_list[projectIndex].tasks[todoIndex].title;
    todo.dataset.index = todoIndex;
    switch (project_list[projectIndex].tasks[todoIndex].priority) {
        case 1:
            todo.classList.add("low");
            break;
        case 2:
            todo.classList.add("moderate");
            break;
        case 3:
            todo.classList.add("high");
            break;
    };
    todoBtn.textContent = "content"
    todoBtn.dataset.index = todoIndex;
    removeBtn.classList = "remove";
    removeBtn.textContent = "Delete";
    todoBtn.addEventListener("click", () => {
        removeAllChildren(dialog);
        displayTodoInfo(projectIndex, todoIndex);
        dialog.showModal();
    } )
    removeBtn.addEventListener("click", () => {
        removeProjectTodos(projectIndex, todoIndex);
    });
    todo.appendChild(todoBtn);
    todo.appendChild(removeBtn);
    content.appendChild(todo);
}
getLocalStorageItems();
displayProjectDOM();
displayAllTodo();
