/*
    /Yapılacalaklar/
    - Reset css eklenecek+
    - Form tasarımı yapılacak+
    - Temel todo işlemleri(ekleme, silme, tikleme) eklenecek
    - Tarih eklenecek(moment.js)
    - Completed kısmı eklenecek
    - Local storage
    - DB kaydı(kişisel kullanım için)
*/

document.querySelector('form').addEventListener('submit', handleSubmitForm)
document.querySelector('.list').addEventListener('click', handleClickDeleteOrCheck)

function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('.add-input');
    if(input.value!="")
        addTodo(input.value);
    input.value = ''
}


function addTodo(todo){
    let ul = document.querySelector('ul');
    let li = document.createElement('li');
    li.innerHTML = `
        <div class="card-left">
            <button name="resolved-btn" class="fas fa-check btn resolved-btn"></button>
            <div class="card-info">
                <h4 class="task">${todo}</h4>
            </div>
        </div>
        <button name="delete-btn" class="fas fa-times btn delete-btn"></button>
    `;
    li.classList.add('card');
    ul.appendChild(li)
}
