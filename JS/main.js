const toDoInput = document.querySelector('.todo-input');
const toDoBtn = document.querySelector('.todo-btn');
const toDoList = document.querySelector('.todo-list');
const standardTheme = document.querySelector('.standard-theme');
const lightTheme = document.querySelector('.light-theme');
const darkerTheme = document.querySelector('.darker-theme');
toDoBtn.addEventListener('click', addToDo);
toDoList.addEventListener('click', deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
standardTheme.addEventListener('click', () => changeTheme('standard'));
lightTheme.addEventListener('click', () => changeTheme('light'));
darkerTheme.addEventListener('click', () => changeTheme('darker'));
let savedTheme = localStorage.getItem('savedTheme');
savedTheme === null ? changeTheme('standard') : changeTheme(localStorage.getItem('savedTheme'));
function addToDo(event) {
    event.preventDefault();
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add('todo', `${savedTheme}-todo`);
    const newToDo = document.createElement('li');
    if (toDoInput.value === '') {
        alert("You must write something!");
    } else {
        newToDo.innerText = toDoInput.value;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);
        const taskObject = {
            task: toDoInput.value,
            subtasks: []
        };
        savelocal(taskObject);
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add('check-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add('delete-btn', `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);
        toDoList.appendChild(toDoDiv);
        toDoInput.value = '';
        const subtaskBtn = document.querySelector('.subtask-btn');
        subtaskBtn.addEventListener('click', () => addSubTask(taskObject));
    }
}   
function deletecheck(event) {
    const item = event.target;
    if (item.classList[0] === 'delete-btn') {
        item.parentElement.classList.add("fall");
        removeLocalTodos(item.parentElement);
        item.parentElement.addEventListener('transitionend', function() {
            item.parentElement.remove();
        });
    }
    if (item.classList[0] === 'check-btn') {
        item.parentElement.classList.toggle("completed");
    }
}
function savelocal(task) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push(task);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function getTodos() { 
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(function(task) {
        const toDoDiv = document.createElement("div");
        toDoDiv.classList.add("todo", `${savedTheme}-todo`);
        const newToDo = document.createElement('li');
        newToDo.innerText = task.task;
        newToDo.classList.add('todo-item');
        toDoDiv.appendChild(newToDo);
        const checked = document.createElement('button');
        checked.innerHTML = '<i class="fas fa-check"></i>';
        checked.classList.add("check-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(checked);
        const deleted = document.createElement('button');
        deleted.innerHTML = '<i class="fas fa-trash"></i>';
        deleted.classList.add("delete-btn", `${savedTheme}-button`);
        toDoDiv.appendChild(deleted);
        toDoList.appendChild(toDoDiv);
    });
}
function addSubTask(currentTask) {
    const subtaskInput = document.querySelector('.subtask-input');
    if (subtaskInput.value !== '') {
        currentTask.subtasks.push(subtaskInput.value);
        savelocal(currentTask);
        subtaskInput.value = '';
    }
}
function removeLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const todoIndex = todos.findIndex(t => t.task === todo.children[0].innerText);
    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
function changeTheme(color) {
    localStorage.setItem('savedTheme', color);
    savedTheme = localStorage.getItem('savedTheme');
    document.body.className = color;
    color === 'darker' ? 
        document.getElementById('title').classList.add('darker-title')
        : document.getElementById('title').classList.remove('darker-title');
    document.querySelector('input').className = `${color}-input`;
    document.querySelectorAll('.todo').forEach(todo => {
        Array.from(todo.classList).some(item => item === 'completed') ? 
            todo.className = `todo ${color}-todo completed`
            : todo.className = `todo ${color}-todo`;
    });
    document.querySelectorAll('button').forEach(button => {
        Array.from(button.classList).some(item => {
            if (item === 'check-btn') {
              button.className = `check-btn ${color}-button`;  
            } else if (item === 'delete-btn') {
                button.className = `delete-btn ${color}-button`; 
            } else if (item === 'todo-btn') {
                button.className = `todo-btn ${color}-button`;
            }
        });
    });
}
