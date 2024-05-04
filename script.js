// const inputBox = document.getElementById("content_2");
// const btn = document.getElementById("btn");
// const listContainer = document.getElementById("list-container");


// function addTask(){
//     if(inputBox.value === ''){
//         alert("you must write something")
//     }
//     else{
//         const li = document.createElement("li");
//         const span = document.createElement("span");
//         // li.innerHTML = inputBox.Value;
//         span.innerHTML = "\u00d7"
//         const deleteBtn = document.createElement("button");
//         button.innerHTML = "delete";
//         deleteBtn.addEventListener("click", function(){
//             li.remove();
//         }
//     );
//         li.appendChild(span);
//         li.appendChild(li);
//         li.appendChild(deleteBtn);
//         listContainer.appendChild(li);
//     }
//     inputBox.Value = "";
//     saveData();
// }
// btn.addEventListener("click", function(){
//     if (inputBox.value.trim() !== ""){
//         addTask(inputBox.value.trim());
//         inputBox.value = "";
//     }
// }, false)

// function saveData(){
//     localStorage.getItem("data", listContainer.innerHTML);
// }
// function showTask(){
//     listContainer.innerHTML = localStorage.getItem("data");
// }
// showTask();






document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.querySelector(".btn");
    const inputBox = document.getElementById("content_2");
    const todoList = document.getElementById("list-container");
    let todos = [];

    // Function to create a new todo item
    function createTodoItem(text) {
        const todo = {
            id: Date.now(),
            text: text,
            done: false
        };

        todos.push(todo);
        saveTodosToLocalStorage();
        renderTodoItem(todo);
    }

    // Function to render todo item
    function renderTodoItem(todo) {
        const li = document.createElement("li");
        const todoText = document.createElement("span");
        todoText.textContent = todo.text;

        const Done = document.createElement("button");
        Done.textContent = "Done";
        Done.classList.add("Done");
        Done.addEventListener("click", function() {
            todoText.classList.toggle("done")
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete");
        deleteButton.addEventListener("click", function() {
            deleteTodoItem(todo.id);
        });

        li.appendChild(todoText);
        li.appendChild(Done);
        li.appendChild(deleteButton);
        li.dataset.id = todo.id;


        if (todo.done) {
            li.classList.add("done");
            todoText.style.textDecoration = "line-through"; // Apply line-through style
        }

        if (todo.done) {
            li.classList.add("done");
        }

        todoList.appendChild(li);
    }

    // Function to toggle todo status
    function toggleTodoStatus(id) {
        todos = todos.map(todo => {
            if (todo.id === id) {
                todo.done = !todo.done;
            }
            return todo;
        });
        saveTodosToLocalStorage();
        renderTodos();
    }

    // Function to delete todo item
    function deleteTodoItem(id) {
        todos = todos.filter(todo => todo.id !== id);
        saveTodosToLocalStorage();
        renderTodos();
    }

    // Function to save todos to local storage
    function saveTodosToLocalStorage() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Function to retrieve todos from local storage
    function retrieveTodosFromLocalStorage() {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
        }
        renderTodos();
    }

    // Function to render all todos
    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach(todo => renderTodoItem(todo));
    }

    // Event listener for add button
    addButton.addEventListener("click", function() {
        if (inputBox.value.trim() !== "") {
            createTodoItem(inputBox.value.trim());
            inputBox.value = "";
        }
    });

    // Retrieve todos from local storage on page load
    retrieveTodosFromLocalStorage();
});
