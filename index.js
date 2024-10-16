// Check for existing to-do items from local storage or start fresh
let toDos = JSON.parse(localStorage.getItem('todos') || '[]');

// Helper function to generate a unique ID
const generateID = () => `todo-${Date.now()}-${Math.random().toString(36)}`;

// Render toDoList
const renderTodos = () => {
    const toDoList = document.getElementById('toDoList');
    toDoList.innerHTML = ''; // Clear current list

    toDos.forEach((toDo) => {
        const itemContainer = document.createElement('div');
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        itemContainer.classList.add('toDoContainer');
        

        // Create checkbox for completion
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('checkbox');
        checkbox.checked = toDo.completed;
        checkbox.onclick = () => toggleCompletion(toDo.id);

        // Create the to-do item element
        const toDoItem = document.createElement('p');
        toDoItem.classList.add('listItem');
        toDoItem.textContent = toDo.text;
        toDoItem.onclick = () => toggleCompletion(toDo.id);

        // Edit input box (hidden initially)
        const editInputBox = document.createElement('input');
        editInputBox.type = 'text';
        editInputBox.classList.add('editBox');
        editInputBox.value = toDo.text;
        editInputBox.style.display = 'none';

        // Add a delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<img id="deleteImage" src="assets/trash-svgrepo-com.png" >';
        deleteButton.classList.add('delete');
        deleteButton.onclick = () => deleteToDo(toDo.id);

        // Add an edit button
        const editButton = document.createElement('button');
        editButton.innerHTML = '<img id="deleteImage" src="assets/pencil-svgrepo-com.png" >';
        editButton.classList.add('edit');
        editButton.onclick = () => editToDo(toDo.id, toDoItem, editInputBox);

        // Append elements to the item container
        toDoList.appendChild(itemContainer);
        itemContainer.appendChild(checkbox);
        itemContainer.appendChild(toDoItem);
        itemContainer.appendChild(editInputBox);
        itemContainer.appendChild(buttonContainer);
        buttonContainer.appendChild(editButton);
        buttonContainer.appendChild(deleteButton);
    });
};

// Save todos to local storage
const saveLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(toDos));
};

// Toggle completion status
const toggleCompletion = (id) => {
    const todo = toDos.find((todo) => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveLocalStorage();
        renderTodos();
    }
};

// Add new item to to-do list
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const userInput = document.getElementById('userInput');
    const addItem = userInput.value.trim();

    if (addItem) {
        const newToDo = { id: generateID(), text: addItem, completed: false };
        toDos.push(newToDo);
        userInput.value = ''; // Clear input after adding
        saveLocalStorage();
        renderTodos();
    }
});

// Edit a to-do item
const editToDo = (id, toDoItem, editInputBox) => {
    toDoItem.style.display = 'none';
    editInputBox.style.display = 'block';
    editInputBox.focus();

    editInputBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const newValue = editInputBox.value.trim();
            const todo = toDos.find((todo) => todo.id === id);
            if (todo && newValue) {
                todo.text = newValue;
                saveLocalStorage();
                renderTodos();
            }
        }
    });
};

// Delete a to-do item
const deleteToDo = (id) => {
    toDos = toDos.filter((todo) => todo.id !== id);
    saveLocalStorage();
    renderTodos();
};

// Initial render on page load
document.addEventListener('DOMContentLoaded', renderTodos);


