const todoForm = document.querySelector("#todo-form");
const inputLista = document.querySelector("#input-lista");
const todoList = document.querySelector("#todo-list");
const formEdit = document.querySelector("#form-edit");
const  inputEdit = document.querySelector("#input-edit");
const cancelEditButton = document.querySelector("#cancel-edit-button");

let oldInputValue;

//Funções
const saveTodo = (text) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTittle = document.createElement("h3");
    todoTittle.innerText = text;
    todo.appendChild(todoTittle);

    const doneButton = document.createElement("button");
    doneButton.classList.add("finish-todo")
    doneButton.innerHTML = ' <i class="fa-solid fa-check"></i>'
    todo.appendChild(doneButton)

    const editButton = document.createElement("button");
    editButton.classList.add("edit-todo")
    editButton.innerHTML = ' <i class="fa-solid fa-pen"></i>'
    todo.appendChild(editButton)

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-todo")
    removeButton.innerHTML = ' <i class="fa-solid fa-xmark"></i>'
    todo.appendChild(removeButton);

    todoList.appendChild(todo);

    inputLista.value = "";
    inputLista.focus();
};

const toggleForms = () =>{
    formEdit.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
}

const updateTodo = (text) =>{
    const todos = document.querySelectorAll(".todo")

    todos.forEach((todo) => {
        let todoTittle = todo.querySelector("h3")

        if(todoTittle.innerText === oldInputValue){
            todoTittle.innerText = text;
        }
    });
}
//Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = inputLista.value;

    if(inputValue){
        saveTodo(inputValue)
    }
});

document.addEventListener("click", (e)=>{
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTittle;

    if(parentEl && parentEl.querySelector("h3")){
     todoTittle = parentEl.querySelector("h3").innerText;
    }

    if(targetEl.classList.contains("finish-todo")){
        parentEl.classList.toggle("done");
    }

    if(targetEl.classList.contains("remove-todo")){
        parentEl.remove();
    }

    if(targetEl.classList.contains("edit-todo")){
        toggleForms();

        inputEdit.value = todoTittle;
        oldInputValue = todoTittle;
    }

});

cancelEditButton.addEventListener("click", (e) =>{
    e.preventDefault();

    toggleForms();
});

formEdit.addEventListener("submit", (e) =>{
    e.preventDefault();

    const editInputValue = inputEdit.value;

    if(editInputValue){
        updateTodo(editInputValue)
    }

    toggleForms();
});