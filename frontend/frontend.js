const checklist = document.getElementById("checklist");
const addItemButton = document.getElementById("add-item-button")

const newItemInput = document.getElementById("new-item-input");
const toDoList = document.getElementById("to-do-list");

newItemInput.hidden = true;

function addItem(item) {
    const newItem = document.createElement("li");
    const itemLabel = document.createElement("label");

    const checkItem = document.createElement("input");
    checkItem.setAttribute("type", "checkbox");
    checkItem.checked = false;

    const itemText = document.createElement("span");
    itemText.classList.add("todo-text");
    itemText.textContent = item;

    checkItem.addEventListener("change", () => {
        itemText.classList.toggle("completed", checkItem.checked);
    });

    itemLabel.appendChild(checkItem);
    itemLabel.appendChild(itemText);

    newItem.appendChild(itemLabel);
    toDoList.appendChild(newItem);

    newItemInput.value = '';
    newItemInput.hidden = true;
    addItemButton.hidden = false;
}

addItemButton.addEventListener("click", (e) => {
    addItemButton.hidden = true;
    newItemInput.hidden = false;
    newItemInput.focus();
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
})