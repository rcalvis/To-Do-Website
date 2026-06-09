const checklist = document.getElementById("checklist");
const addItemButton = document.getElementById("add-item-button")

const newItemInput = document.getElementById("new-item-input");
const toDoList = document.getElementById("to-do-list");
const deleteItemsButton = document.getElementById("delete-items-button");
const cancelAddButton = document.getElementById("cancel-add-button");

newItemInput.hidden = true;
deleteItemsButton.hidden = true;
cancelAddButton.hidden = true;
let deleteSelected = false;

function addItem(item) {
    // Create item, area for text, and delete button.
    const newItem = document.createElement("li");
    const itemLabel = document.createElement("label");
    itemLabel.classList.add("todo-row");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");
    deleteButton.textContent = "🗑️";
    deleteButton.hidden = true;

    // Create checkbox for item.
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.checked = false;

    // Add inputed text to list item.
    const itemText = document.createElement("span");
    itemText.classList.add("todo-text");
    itemText.textContent = item;

    // Add event listeners for checkbox and delete button.
    checkbox.addEventListener("change", () => {
        itemText.classList.toggle("completed", checkbox.checked);
    });

    deleteButton.addEventListener("click", (e) => {
        deleteItem(newItem);
    });

    // Add children and put together list item.
    itemLabel.appendChild(checkbox);
    itemLabel.appendChild(itemText);

    newItem.appendChild(itemLabel);
    itemLabel.appendChild(deleteButton);
    toDoList.appendChild(newItem);

    // Show/delete items.
    newItemInput.value = '';
    newItemInput.hidden = true;
    addItemButton.hidden = false;
    deleteItemsButton.hidden = false;
    cancelAddButton.hidden = true;
    deleteSelected = false;
    showDelete(deleteSelected);
}

// Delete selected item from list.
function deleteItem(item) {
    item.remove();
    if (toDoList.children.length == 0) {
        deleteItemsButton.hidden = true;
    }
}

// Show/hide delete buttons on each item.
function showDelete(deleteSelected) {
    for (const item of toDoList.children) {
        const button = item.querySelector("button");
        if (deleteSelected) {
            button.hidden = false;
            deleteItemsButton.textContent = "Cancel";
        } else {
            button.hidden = true;
            deleteItemsButton.textContent = "Delete Items";
        }
    };
}

addItemButton.addEventListener("click", (e) => {
    addItemButton.hidden = true;
    newItemInput.hidden = false;
    deleteItemsButton.hidden = true;
    cancelAddButton.hidden = false;
    newItemInput.focus();
    deleteSelected = false;
    showDelete(deleteSelected);
});

newItemInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter") {
        if (newItemInput.value.trim() != null) {
            const itemValue = newItemInput.value;
            addItem(itemValue);
        } else {
            alert("You cannot leave new item field empty!");
        }
    }
});

deleteItemsButton.addEventListener("click", (e) => {
    deleteSelected = !deleteSelected;
    showDelete(deleteSelected);
});

cancelAddButton.addEventListener("click", (e) => {
    newItemInput.hidden = true;
    cancelAddButton.hidden = true;
    addItemButton.hidden = false;
    if (toDoList.children.length > 0) {
        deleteItemsButton.hidden = false;
    }
})