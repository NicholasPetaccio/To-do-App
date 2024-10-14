// Check for existing to-do items from local storage or start fresh
let toDos = JSON.parse(localStorage.getItem('todos') || '[]');

// Render toDoList
const renderTodos = () => {
    console.log("Rendering todos...", toDos); // Debugging log
    const toDoList = document.getElementById('toDoList');
    toDoList.innerHTML = ''; // Clear current list

    toDos.forEach((toDo, index) => {
        const toDoItem = document.createElement('li');
        toDoItem.textContent = toDo;

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Del';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteToDo(index);

        toDoItem.appendChild(deleteButton);
        toDoList.appendChild(toDoItem);
    });
};

// Save todos to local storage
const saveLocalStorage = () => {
    console.log("Saving to local storage", toDos); // Debugging log
    localStorage.setItem('todos', JSON.stringify(toDos));
};

// Add new item to to-do list
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('userInput');
    const addItem = userInput.value.trim();

    if (addItem) {
        toDos.push(addItem);
        userInput.value = ''; // Clear input after adding
        saveLocalStorage();
        renderTodos(); // Call render after adding new item
    }
});

// Delete a to-do item
const deleteToDo = (index) => {
    toDos.splice(index, 1);
    saveLocalStorage();
    renderTodos();
};

// Initial render on page load
document.addEventListener('DOMContentLoaded', renderTodos);

