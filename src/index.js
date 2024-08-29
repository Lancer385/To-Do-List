import {project_list, removeProject, getLocalStorageItems, assignMethodsToObjects} from "./TodoStore";
import { format, isWithinInterval, isToday } from "date-fns";
import { createProject } from "./TodoStore";
import "./style.css";





// getting the main html skeleton
const inbox = document.querySelector("#inbox");
const today = document.querySelector("#today");
const week = document.querySelector("#week");
const content = document.querySelector("#content");
const projectsNode = document.querySelector("#projects");


inbox.textContent = "All Todos";
today.textContent = "Today";
week.textContent = "This Week";





// dialog for project, todo forms and todo descriptions
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
});
projectCancelBtn.textContent = "Cancel";
projectSubmit.type = "submit";
projectSubmit.textContent = "Submit";
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
todoSubmit.textContent = "Submit";
todoCancelBtn.textContent = "Cancel";
todoForm.required = true;   
todoPriority.required = true;
todoForm.appendChild(todoTitle);
todoForm.appendChild(todoDesc);
todoForm.appendChild(todoPriority);
todoForm.appendChild(todoDueDate);
todoForm.appendChild(todoSubmit);
todoForm.appendChild(todoCancelBtn)


// event listeners //


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
    let parsedProject = assignMethodsToObjects();
    parsedProject[projectIndex].createTask(todoTitle.value, todoDesc.value, parseInt(todoPriority.value), todoDueDate.value);
    localStorage.setItem("projects", JSON.stringify(parsedProject));
    displayProjectTodos(projectIndex);
    todoForm.reset();
    dialog.close();
});


todoCancelBtn.addEventListener("click",  (e)=> {
    e.preventDefault();
    dialog.close();
});

// display functions //


function displayAllTodo(){
    removeAllChildren(content);
    for (let i = 0; i < project_list.length; i++){
        for  (let j = 0; j < project_list[i].tasks.length; j++){
            addTodoContent(i, j);
        };
    };
    sortTodos();
    resetActiveButtons();
    inbox.classList.add("active")
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
    sortTodos()
    today.classList.add("active")
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
    sortTodos()
    week.classList.add("active")
};

function displayProjectDOM(){
    removeAllChildren(projectsNode)
    for (let i = 0; i< project_list.length; i++){
        let project = document.createElement("div");
        let projectBtn = document.createElement("button");
        let removeBtn = document.createElement("button");
        project.dataset.index = i;
        project.classList = "projects"
        projectBtn.textContent = project_list[i].title;
        projectBtn.classList = "view"
        removeBtn.textContent = "Delete";
        removeBtn.dataset.index = i;
        removeBtn.classList = "remove"
        project.appendChild(projectBtn);
        project.appendChild(removeBtn);
        projectsNode.appendChild(project)
        project.addEventListener("click", (e) => {
            resetActiveButtons();
            e.target.classList.add('active')
            displayProjectTodos(parseInt(e.target.dataset.index));
        });
        removeBtn.addEventListener("click", () => {
            resetActiveButtons();
            removeProjectDOM(parseInt(removeBtn.dataset.index));
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

// displaying todo based on the selected project
function displayProjectTodos(projectIndex){
    removeAllChildren(content);
    for (let i = 0; i < project_list[projectIndex].tasks.length; i++){
        let todo = document.createElement("div");
        let dueDate = document.createElement("div");
        let todoBtn = document.createElement("button");
        let removeBtn = document.createElement("button");
        todo.classList = "todos";
        dueDate.textContent = `DueDate : ${project_list[projectIndex].tasks[i].dueDate}`;
        todo.dataset.index = i;
        switch (project_list[projectIndex].tasks[i].priority) {
            case 1:
                todo.classList.add("1");
                break;
            case 2:
                todo.classList.add("2");
                break;
            case 3:
                todo.classList.add("3");
                break;
        };
        todoBtn.textContent = project_list[projectIndex].tasks[i].title;
        todoBtn.dataset.index = i;
        removeBtn.classList = "remove";
        removeBtn.textContent = "Delete";
        todoBtn.addEventListener("click", () => {
            removeAllChildren(dialog);
            displayTodoInfo(projectIndex, i);
            dialog.showModal();
        } )
        removeBtn.addEventListener("click", () => {
            removeProjectTodos(projectIndex, i);
        });
        todo.appendChild(todoBtn);
        todo.appendChild(dueDate);
        todo.appendChild(removeBtn);
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

function displayTodoInfo(projectIndex, todoIndex){
    const container = document.createElement("div")
    const title = document.createElement("p")
    const desc = document.createElement("p");
    const priority = document.createElement("p");
    const closeBtn = document.createElement("button")
    title.textContent = `Title: ${project_list[projectIndex].tasks[todoIndex].title}.`;
    desc.textContent =  `Description: ${project_list[projectIndex].tasks[todoIndex].desc}.`;
    switch (project_list[projectIndex].tasks[todoIndex].priority){
        case 1:
            priority.textContent = `Priority: Low.`;
            break;
        case 2:
            priority.textContent = `Priority: moderate.`
            break;
        case 3:
            priority.textContent = `Priority : high.`
            break;
    };
    closeBtn.textContent = "Close"
    container.appendChild(title);
    container.appendChild(desc);
    container.appendChild(priority);
    container.appendChild(closeBtn);
    dialog.appendChild(container);
    closeBtn.addEventListener("click", () => {
        dialog.close();
    });
}

// dynamically create the content of each todo
function addTodoContent(projectIndex, todoIndex){
    let todo = document.createElement("div");
    let dueDate = document.createElement("div");
    let todoBtn = document.createElement("button");
    todo.classList = "todos";
    dueDate.textContent = `DueDate : ${project_list[projectIndex].tasks[todoIndex].dueDate}`;
    todo.dataset.index = todoIndex;
    switch (project_list[projectIndex].tasks[todoIndex].priority) {
        case 1:
            todo.classList.add("1");
            break;
        case 2:
            todo.classList.add("2");
            break;
        case 3:
            todo.classList.add("3");
            break;
    };
    todoBtn.textContent = project_list[projectIndex].tasks[todoIndex].title;
    todoBtn.dataset.index = todoIndex;
    todoBtn.addEventListener("click", () => {
        removeAllChildren(dialog);
        displayTodoInfo(projectIndex, todoIndex);
        dialog.showModal();
    } )
    todo.appendChild(todoBtn);
    todo.appendChild(dueDate);
    content.appendChild(todo);
};


// removal functions //


function removeProjectDOM(projectIndex){
    removeProject(projectIndex);
    removeAllChildren(projectsNode);
    removeAllChildren(content);
    displayProjectDOM();
    displayAllTodo();
}

function removeProjectTodos(projectIndex, todoIndex){
    let parsedProject = JSON.parse(localStorage.getItem("projects"));
    parsedProject[projectIndex].tasks.splice(todoIndex, 1);
    localStorage.setItem("projects", JSON.stringify(parsedProject));
    project_list[projectIndex].removeTask(todoIndex);
    let child = document.querySelector(`div[data-index="${todoIndex}"]`)
    child.remove();
}







// helper functions //


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


// this method is used for today, week and all-todo displays.
function sortTodos(){
    let todos = Array.from(content.querySelectorAll(".todos"));
    todos.sort((a, b) => {
        let first = parseInt(a.className.split(' ')[1], 10)
        let second = parseInt(b.className.split(' ')[1], 10);
        return second - first;
    });
    todos.forEach(todo => content.appendChild(todo));
}

// initial calls //

getLocalStorageItems();
displayProjectDOM();
displayAllTodo();
