const form = document.querySelector('.input');
const addInput = document.querySelector('.add-input');
const list = document.querySelector('.list');
const count = document.querySelector('#task-count');

// We need an array to hold our state
let items = [];

function handleSubmit(e) {
    e.preventDefault();
    // console.log('added!!');
    const title = addInput.value.trim();
    if (!title) return;
    const item = {
      title,
      id: Date.now(),
    //   id: moment(new Date()).format("DD.MM.YYYY - hh:mm"),
      complete: false,
    };
    items.push(item);
    e.target.reset();
    // fire off a custom event that will tell anyone else who cares that the items have been updated!
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function displayItems() {
    // console.log(items);
    const html = items
      .map(
        item => `<li class="card">
            <div class="card-left">
                <input name="resolve" class="resolve" 
                value="${item.id}"
                type="checkbox"
                ${item.complete && 'checked'}>
                <div class="card-info">
                    <h4 class="task">${item.title}</h4>
                </div>
            </div>
            <button aria-label="Remove ${item.title}"
            value="${item.id}" name="delete-btn" class="fas fa-times btn delete-btn"></button>
        </li>`
      )
      .join('');
    list.innerHTML = html;
}
function mirrorToLocalStorage() {
    // console.info('Saving todos to localstorage');s
    localStorage.setItem('items', JSON.stringify(items));
    count.innerHTML = `${items.length} Tasks`;
    date.innerHTML = moment(new Date()).format("ddd, DD MMM YYYY");
    
}  
function restoreFromLocalStorage() {
    // console.info('Restoring from LS');x
    const lsItems = JSON.parse(localStorage.getItem('items'));
    if (lsItems.length === 0) {
        const manual = 
          {
            id: 1,
            complete: false,
            title: 'Hello',
          };
        items.push(manual);
        localStorage.setItem('items', JSON.stringify(items));
        }
        // pull the items from LS
    else if (lsItems.length) {
      items.push(...lsItems);
      list.dispatchEvent(new CustomEvent('itemsUpdated'));
    }
}
function deleteItem(id) {
    // console.log('DELETIENG ITEM', id);
    // update our items array without this one
    items = items.filter(item => item.id !== id);
    // console.log(items);
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
}
function markAsComplete(id) {
    // console.log('Marking as complete', id);
    const itemRef = items.find(item => item.id === id);
    itemRef.complete = !itemRef.complete;
    list.dispatchEvent(new CustomEvent('itemsUpdated'));
} 
form.addEventListener('submit', handleSubmit);
list.addEventListener('itemsUpdated', displayItems);
list.addEventListener('itemsUpdated', mirrorToLocalStorage);
// Event Delegation: We listen or the click on the list <ul> but then delegate the click over to the button if that is what was clicked
list.addEventListener('click', function(e) {
    const id = parseInt(e.target.value);
    if (e.target.matches('button')) {
      deleteItem(id);
    }
    if (e.target.matches('input[type="checkbox"]')) {
      markAsComplete(id);
    }
});
restoreFromLocalStorage();