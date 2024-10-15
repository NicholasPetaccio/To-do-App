// Check for existing to-do items from local storage or start fresh
let toDos = JSON.parse(localStorage.getItem('todos') || '[]');

// Render toDoList
const renderTodos = () => {
    console.log("Rendering todos...", toDos); // Debugging log
    const toDoList = document.getElementById('toDoList');
    toDoList.innerHTML = ''; // Clear current list

    toDos.forEach((toDo, index) => {
        const itemContainer = document.createElement('div');
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        itemContainer.classList.add('toDoContainer');

        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.classList.add('checkbox');

        const toDoItem = document.createElement('p');
        toDoItem.classList.add('listItem');
        toDoItem.textContent = toDo;

        const editInputBox = document.createElement('input');
        editInputBox.setAttribute('type', 'text');
        editInputBox.classList.add('editBox');
        editInputBox.value = toDo; // Set initial value to the current to-do
        editInputBox.style.display = 'none'; // Hide initially

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'D';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteToDo(index);

        // Add an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'E';
        editButton.classList.add('edit');
        editButton.onclick = () => editToDo(index, toDoItem, editInputBox);

        // Append children to containers
        toDoList.appendChild(itemContainer);
        itemContainer.appendChild(checkbox);
        itemContainer.appendChild(toDoItem);
        itemContainer.appendChild(editInputBox); // Append input box
        itemContainer.appendChild(buttonContainer);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
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

// Edit a to-do item
const editToDo = (index, toDoItem, editInputBox) => {
    toDoItem.style.display = 'none'; // Hide the current text
    editInputBox.style.display = 'block'; // Show the input box
    editInputBox.focus(); // Focus on the input box

    // Listen for Enter key to save the edit
    editInputBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newValue = editInputBox.value.trim();
            if (newValue) {
                toDos[index] = newValue; // Update the to-do item
                saveLocalStorage();
                renderTodos(); // Re-render the list with updated text
            }
        }
    });
};

// Delete a to-do item
const deleteToDo = (index) => {
    toDos.splice(index, 1);
    saveLocalStorage();
    renderTodos();
};

// Initial render on page load
document.addEventListener('DOMContentLoaded', renderTodos);


