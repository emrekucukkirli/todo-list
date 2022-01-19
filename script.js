/*
    /Yapılacalaklar/
    - Reset css eklenecek+
    - Form tasarımı yapılacak+
    - Temel todo işlemleri(ekleme, silme, tikleme) eklenecek+
    - Local storage
*/
const form = document.querySelector('.input');
const addInput = document.querySelector('.add-input');
const todoList = document.querySelector('.list');
const date = document.querySelector('#date');
const count = document.querySelector('#task-count');
eventListeners();


function eventListeners() {
    form.addEventListener("submit", addTodo);
    todoList.addEventListener("click", deleteTodo);
    todoList.addEventListener("click", resolvedTodo);
    document.addEventListener("DOMContentLoaded", loadTodosUI);
}
function addTodo(e){
    const newTodo = addInput.value.trim();
    if(newTodo!=""){
        addTodoUI(newTodo);
        addTodoStorage(newTodo);
    }
    e.preventDefault();
}
function addTodoUI(newTodo) {    
    let li = document.createElement('li');
    li.innerHTML = `
        <div class="card-left">
            <button name="resolved-btn" class="fas fa-check btn resolved-btn"></button>
            <div class="card-info">
                <h4 class="task">${newTodo}</h4>
            </div>
        </div>
        <button name="delete-btn" class="fas fa-times btn delete-btn"></button>
    `;
    li.classList.add('card');
    todoList.appendChild(li);
    addInput.value="";
}
function getTodoStorage(newTodo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    count.innerHTML = `${todos.length} Tasks`;
    return todos;
}
function addTodoStorage(newTodo) {
    let todos = getTodoStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}
function loadTodosUI() {
    let todos = getTodoStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    })
}
function deleteTodoStorage(deleteTodo) {
    let todos = getTodoStorage();
    todos.forEach(function(todo){
        if (todo === deleteTodo) {
            todos.splice(index);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}
function deleteTodo(e) {
    if (e.target.name === "delete-btn") {
        e.target.parentElement.remove();
        deleteTodoStorage(e.target.parentElement);
    }
}
function resolvedTodo(e) {
    if (e.target.name === "resolved-btn") {
        if (e.target.parentElement.parentElement.className !=='card resolved') {
            e.target.parentElement.parentElement.classList.add('resolved');
        } else {
            e.target.parentElement.parentElement.classList.remove('resolved');
        }
    }
}

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd;
} 
if(mm<10) 
{
    mm='0'+mm;
} 
today = dd+'.'+mm+'.'+yyyy;
date.innerHTML=`${today}`;


