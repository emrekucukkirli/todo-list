/*
    /Yapılacalaklar/
    - Reset css eklenecek+
    - Form tasarımı yapılacak+
    - Temel todo işlemleri(ekleme, silme, tikleme) eklenecek+
    - Tarih eklenecek(moment.js)
    - Completed kısmı eklenecek
    - Local storage
    - DB kaydı(kişisel kullanım için)
*/
const form = document.querySelector('.input');
const addInput = document.querySelector('.add-input');
const todoList = document.querySelector('.list');

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    todoList.addEventListener("click", deleteTodo);
    todoList.addEventListener("click", resolvedTodo);
}
function addTodo(e){
    const newTodo = addInput.value.trim();
    if(newTodo!=""){
        addTodoUI(newTodo);
    }
    e.preventDefault();
}
function deleteTodo(e) {
    if (e.target.name === "delete-btn") {
        e.target.parentElement.remove();
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
