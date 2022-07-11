// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// event listeners
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// functions
function addTodo(event) {
  event.preventDefault();
  // TODO-DIV (container)
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // CHILDREN:
  // Add a todo-item being a list item <li>
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  todoDiv.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  /* UPDATE LOCAL STORAGE */
  saveLocalTodos(todoInput.value);
  // Sibling complete-btn <button>
  const completeBtn = document.createElement("button");
  completeBtn.innerHTML = `<i class="fas fa-check"></i?>`;
  completeBtn.classList.add("complete-btn");
  todoDiv.appendChild(completeBtn);
  // Sibling trash-btn <button>
  const trashBtn = document.createElement("button");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
  trashBtn.classList.add("trash-btn");
  todoDiv.appendChild(trashBtn);
  // Lastly, append todoDiv to an unordered list <ul>
  todoList.appendChild(todoDiv);
  todoInput.value = ""; // clear <input> value
}

function deleteCheck(event) {
  const className = event.target.className;
  const todo = event.target.parentElement;
  switch (className) {
    case "trash-btn":
      todo.classList.add("fall");
      removeLocalTodos(todo);
      todo.addEventListener("transitionend", () => todo.remove());
      break;
    case "complete-btn":
      todo.classList.toggle("completed");
      break;
    default:
      throw new Error("No matching condition.");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    const { value } = event.target;
    switch (value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
      case "uncompleted":
        !todo.classList.contains("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos; // placeholder
  // #1 check if we have a todos entry.
  localStorage.getItem("todos") === null
    ? // #2 if null we define a empty one
      (todos = [])
    : // #3 otherwise we get current values
      (todos = JSON.parse(localStorage.getItem("todos")));

  // #4 we push any new entry and update storage
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos; // placeholder
  localStorage.getItem("todos") === null
    ? (todos = [])
    : (todos = JSON.parse(localStorage.getItem("todos")));

  todos.forEach((todo) => {
    console.log(todo);
    // TODO-DIV (container)
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // CHILDREN:
    // Add a todo-item being a list item <li>
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    todoDiv.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // Sibling complete-btn <button>
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = `<i class="fas fa-check"></i?>`;
    completeBtn.classList.add("complete-btn");
    todoDiv.appendChild(completeBtn);
    // Sibling trash-btn <button>
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);
    // Lastly, append todoDiv to an unordered list <ul>
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  localStorage.getItem("todos") === null
    ? (todos = [])
    : (todos = JSON.parse(localStorage.getItem("todos")));

  const todoIndex = todos.indexOf(todo.children[0].innerText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
