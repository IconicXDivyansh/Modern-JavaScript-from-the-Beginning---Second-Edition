const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");
const formBtn = itemForm.querySelector("button");
let isEditMode = false;

function displayItems() {
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    itemsFromLocalStorage.forEach((item) => { addItemToDOM(item) });
    checkUI();
}

function onAddItemSubmit(e) {
    e.preventDefault();

    const newItem = itemInput.value; // get input value

    // validate input

    if (newItem == "") {
        alert("Please enter an item");
        return;
    }

    // check for edit mode
    if (isEditMode) { 
        // grab the current item we are editing and remove it from the DOM and localStorage as well 
        const itemToEdit = document.querySelector(".edit-mode");
        removeItemFromLocalStorage(itemToEdit.textContent);
        itemToEdit.classList.remove("edit-mode");
        itemToEdit.remove();
        isEditMode = false;
    } else {
        if(checkIfItemExists(newItem)) {
            alert("Item already exists");
            return;
    }

    // create new item and add it to the DOM
    addItemToDOM(newItem);
    // persist those items to local storage
    addItemToLocalStorage(newItem);

    // make sure to run checkUI in order to display filter items and clear button
    checkUI();

    // clear the input field
    itemInput.value = "";

}

function addItemToDOM(item) { 
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(item));

    const button = createButton("remove-item btn-link text-red")

    li.appendChild(button);
    // add li to the dom
    itemList.appendChild(li);
}



function createButton(classes) { 
    const button = document.createElement("button");
    button.className = classes;
    const icon = document.createElement("i");
    icon.className = "fa-solid fa-xmark";
    button.appendChild(icon);
    return button;
}


function createIcon(classes) {
    const icon = document.createElement("i");
    icon.className = classes;
    return icon;
}

function addItemToLocalStorage(item) {
    const itemsFromLocalStorage = getItemsFromLocalStorage(); 
   
    // add new item to array
    itemsFromLocalStorage.push(item);


    // convert JSON to string and store it in local storage
    localStorage.setItem("items", JSON.stringify(itemsFromLocalStorage));

}

function getItemsFromLocalStorage() { 
    let itemsFromLocalStorage;
    if (localStorage.getItem("items") === null) { 
        itemsFromLocalStorage = [];
    } else {
        itemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
    }

    return itemsFromLocalStorage;
}


function onClickItem(e) {
    if (e.target.parentElement.className.includes("remove-item")) {
        removeItem(e.target.parentElement.parentElement);
    } else {
        setItemToEdit(e.target);
    }
}

function checkIfItemExists(item) { 
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    return itemsFromLocalStorage.includes(item);
}


function setItemToEdit(item) { 
    isEditMode = true;
    // this makes sure only one item is in edit mode at a time
    itemList.querySelectorAll("li").forEach((item) => item.classList.remove("edit-mode"));

    item.classList.add("edit-mode");
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update item';
    formBtn.style.backgroundColor = "#228B22";
    itemInput.value = item.textContent;
    itemInput.focus();

}

function removeItem(item) {
    if (confirm("Are you sure?")) { 
        // remove item from dom
        item.remove();
        // remove item from local Storage as well
        removeItemFromLocalStorage(item.textContent);

        checkUI();
    }
}

function removeItemFromLocalStorage(item) { 
    const itemsFromLocalStorage = getItemsFromLocalStorage();
    console.log(itemsFromLocalStorage);
    const updatedItems = itemsFromLocalStorage.filter(i => i !== item);
    localStorage.setItem("items", JSON.stringify(updatedItems));
}


function clearItems() { 
    // itemList.innerHTML = ""; // a common way
    // better and faster way of doing it

    while(itemList.firstChild){ 
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem("items");

    checkUI();
}

function filterItems(e) {
    console.log(e.target.value);
    const text = e.target.value.toLowerCase();
    const items = document.querySelectorAll("li");
    items.forEach((item) => {
        if (item.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
            item.style.display = "block";
        }
        else {
            item.style.display = "none";
        }
    })
}

function checkUI() {
    itemInput.value = "";
    // defining the listItems here so that we can fetch most recent value of listItems
    const listItems = document.querySelectorAll("li"); 

    if(listItems.length == 0) {
        clearBtn.style.display = "none";
        itemFilter.style.display = "none";
    } else {
        clearBtn.style.display = "block";
        itemFilter.style.display = "block";
    }

    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
    formBtn.style.backgroundColor = "#333";

    isEditMode = false;
}


function init() {
    // event listeners
    itemForm.addEventListener("submit", onAddItemSubmit);
    itemList.addEventListener("click", onClickItem);
    clearBtn.addEventListener("click", clearItems);
    itemFilter.addEventListener("input", filterItems);
    window.addEventListener("DOMContentLoaded", displayItems);
    
    checkUI();
}

init();