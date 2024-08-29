import {project_list} from "./TodoStore";
import { format, isWithinInterval, startOfWeek, endOfWeek, isToday } from "date-fns";
import { createProject } from "./TodoStore";
import "./style.css";
createProject(project_list, "project1")
console.log(project_list);

project_list[0].createTask("rg", "rhr", 2, format(new Date(), 'yyyy-MM-dd'))



const inbox = document.querySelector("#inbox");
const today = document.querySelector("#today");
const week = document.querySelector("#week");
const content = document.querySelector("#content");
const projectsNode = document.querySelector("#projects");


inbox.textContent = "Inbox";
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
projectFrom.appendChild(projectCancelBtn);
projectFrom.appendChild(projectSubmit);

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
    project_list[projectIndex].createTask(todoTitle.value, todoDesc.value, todoPriority.value, todoDueDate.value);
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

displayAllTodo()

function displayAllTodo(){
    removeAllChildren(content);
    for (let i = 0; i < project_list.length; i++){
        for  (let j = 0; j < project_list[i].tasks.length; j++){
            addTodoContent(i, j);
        }
      
    };
};

function displayTodayTodos(){
    removeAllChildren(content);
    for (let i = 0; i < project_list.length; i++){
        for  (let j = 0; j < project_list[i].tasks.length; j++){
            if( isToday(project_list[i].tasks[j].dueDate)){
                addTodoContent(i, j);
            }
        }
      
    };

}

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
    todo.classList = "todos";
    todo.textContent = project_list[projectIndex].tasks[todoIndex].title;
    todoBtn.textContent = "content"
    todoBtn.dataset.index = todoIndex;
    todoBtn.addEventListener("click", () => {
        removeAllChildren(dialog);
        displayTodoInfo(projectIndex, todoIndex);
        dialog.showModal();
    } )
    todo.appendChild(todoBtn)
    content.appendChild(todo);
}
displayProjectDOM()
displayAllTodo();