// const reponse = await fetch("api-http/db.json");
// const todoParent = await reponse.json();
// let todoList: Array<task> = todoParent.todoList;

let todoList: Array<task> = [
  {
      "id": 0,
      "nom": "Complete online JavaScript course",
      "complete": true
  },
  {
      "id": 1,
      "nom": "Jog around the park 3x",
      "complete": false
  },
  {
      "id": 2,
      "nom": "10 minutes meditation",
      "complete": false
  },
  {
      "id": 3,
      "nom": "Read for 1 hour",
      "complete": false
  },
  {
      "id": 4,
      "nom": "Pick up groceries",
      "complete": false
  },
  {
      "id": 5,
      "nom": "Complete Todo App on Fronden Mentor",
      "complete": false
  }
]

interface task {
  id: number,
  nom: String,
  complete: boolean
}



// Initialize color switch button
function initThemeColorBtn() {
  const switchThemeButton = document.getElementById("theme-switch");
  switchThemeButton?.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    document.body.classList.toggle("dark-mode");
  });
}

// Initialize fired event on task check
function initCompleteTasks(todoList: Array<task>) {
  const checkboxsTask: NodeListOf<HTMLInputElement> = document.querySelectorAll(
    '#form-list-todo input[type="checkbox"]'
  );
  for (let i = 0; i < checkboxsTask.length; i++) {
    checkboxsTask[i]?.addEventListener("click", () => {
      todoList[i].complete = checkboxsTask[i].checked;
      itemsLeft();
    });
  }
}

function initClearCompleted() {
  const buttonClear = document.querySelector('#wrapper-clear-completed');
  buttonClear?.addEventListener('click', () => {
    for (let i = todoList.length - 1; i >= 0; i--) {
      if (todoList[i].complete) {
        todoList.splice(i, 1);
      }
    }
    createTodolist(todoList);
  })
}



/**
 * Functions to manipulate the todolist
 */

// Create the sortable interaction
function initSortable() {
  $("#form-list-todo ul").sortable({
    handle: ".reorder",
    placeholder: "ui-sortable-placeholder",
    update: function() {
      const listDisplayed: NodeListOf<HTMLLIElement> = document.querySelectorAll("li label");
      const taskCompleted: NodeListOf<HTMLInputElement> = document.querySelectorAll("li input");
      clearTodolist();
      for (let i = 0; i < listDisplayed.length; i++) {
        createElement(i, listDisplayed[i].innerText, taskCompleted[i].checked);
        todoList[i].id = i;
        todoList[i].nom = listDisplayed[i].innerText;
        todoList[i].complete = taskCompleted[i].checked;
      }
      itemsLeft();
      checkArrayEmpty(todoList);
      initCompleteTasks(todoList);
      initDeleteTask();
      const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
      if (buttonsFilter[0].checked) {
        initSortable();
      }
      checkForDraggableIcon();
    }
  });
}
  // const sortableList: HTMLUListElement | null = document.querySelector("#form-list-todo ul");
  // console.log(sortableList);
  // sortableList.sortable({
  //   handle: ".reorder"
  // });
  // const handleSortable: HTMLElement | null = document.querySelector(".reorder");
  // handleSortable.sortable( "option", "handle", ".handle" );
  // // Create sortable
  // const sortableList: HTMLUListElement | null = document.querySelector("#form-list-todo ul");
  // new Sortable(sortableList, {
  //   handle: '.reorder', // handle's class
  //   animation: 150,
  //   ghostClass: "sortable-ghost",  // Class de l'élément qui suis dans la todo
  //   chosenClass: "sortable-chosen",  // Class name for the chosen item
  //   dragClass: "sortable-drag",  // Class de l'élément qui suis la souris
  //   onEnd: function () {
  //     const listDisplayed: NodeListOf<HTMLLIElement> = document.querySelectorAll("li label");
  //     const taskCompleted: NodeListOf<HTMLInputElement> = document.querySelectorAll("li input");
  //     clearTodolist();
  //     for (let i = 0; i < listDisplayed.length; i++) {
  //       createElement(i, listDisplayed[i].innerText, taskCompleted[i].checked);
  //       todoList[i].id = i;
  //       todoList[i].nom = listDisplayed[i].innerText;
  //       todoList[i].complete = taskCompleted[i].checked;
  //     }
  //     itemsLeft();
  //     checkArrayEmpty(todoList);
  //     initCompleteTasks(todoList);
  //     initDeleteTask();
  //     const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
  //     if (buttonsFilter[0].checked) {
  //       initSortable();
  //     }
  //     checkForDraggableIcon();
  //   }
  // });

function checkForDraggableIcon() {
  const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
  const tasksHandle: NodeListOf<HTMLElement> = document.querySelectorAll('.reorder');
      if (buttonsFilter[1].checked || buttonsFilter[2].checked) {
        for (let i = 0; i < tasksHandle.length; i++) {
          tasksHandle[i].classList.add('deactived');
        }
      } else if (buttonsFilter[0].checked) {
        for (let i = 0; i < tasksHandle.length; i++) {
          tasksHandle[i].classList.remove('deactived');
        }
      }
}

// Initialize the adding task with the input text
function initAddTask() {
  const formAddTodo: HTMLFormElement | null = document.querySelector("#form-add-todo");
  const inputTask: HTMLInputElement | null = document.querySelector("#add-todo");
  formAddTodo?.addEventListener('submit', (event) => {
    event.preventDefault();
    let content: String | undefined = inputTask?.value;
    addTask(todoList, content);
    if (inputTask) {
    inputTask.value = '';
    }
  })
}

/**
 * Add a task in position of the list
 * @param todoList 
 * @param content 
 */
function addTask(todoList: Array<task>, content: String | undefined) {
  // Test if content is empty
  if (content == undefined) {
    return
  }
  // Add the content in first position
  todoList.unshift({
    id: 0,
    nom: content,
    complete: false
  })
  // Switch the id every task in the list
  for (let i = 1; i < todoList.length; i++) {
    todoList[i].id = i;
  }
  let buttonFilterAll: HTMLInputElement | null = document.querySelector("#all");
  if (buttonFilterAll != null) {
    buttonFilterAll.checked = true;
  }
  createTodolist(todoList);
}

// Initialize the delete a task button
function initDeleteTask() {
  const deleteTaskButton: NodeListOf<HTMLElement> | null = document.querySelectorAll(".cross");
  for (let i = 0; i < deleteTaskButton.length; i++) {
    deleteTaskButton[i].addEventListener('click', () => {
      console.log(deleteTaskButton[i].id)
      const indexTask: number = parseInt(deleteTaskButton[i].id);
      todoList.splice(indexTask, 1);
      // Switch the id every task in the list
      for (let i = 0; i < todoList.length; i++) {
      todoList[i].id = i;
      }
      const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
      if (buttonsFilter[1].checked) {
        const todoListFiltered = todoList.filter((task) => {
          return task.complete == false;
        })
        createTodolist(todoListFiltered);
      } else if (buttonsFilter[2].checked) {
        const todoListFiltered = todoList.filter((task) => {
          return task.complete == true;
        })
        createTodolist(todoListFiltered);
      } else {
        createTodolist(todoList);
      }
    })
  }
}

// Filter all tasks
function filterAllTasks (todoList: Array<task>) {
  const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
   buttonsFilter[0].addEventListener('click', () => {
    createTodolist(todoList);
  });
}

// Filter the uncompleted tasks
function filterUncompletedTasks (todoList: Array<task>) {
  const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
   buttonsFilter[1].addEventListener('click', () => {
    const todoListFiltered = todoList.filter((task) => {
      return task.complete == false;
    })
    createTodolist(todoListFiltered);
  });
}

// Filter the completed tasks
function filterCompletedTasks (todoList: Array<task>) {
  const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
   buttonsFilter[2].addEventListener('click', () => {
    const todoListFiltered = todoList.filter((task) => {
      return task.complete == true;
    })
    createTodolist(todoListFiltered);
  });
}

function initFilters (todoList: Array<task>) {
  filterAllTasks(todoList);
  filterUncompletedTasks(todoList);
  filterCompletedTasks(todoList);
}


/**
 * Functions to generate todolist
 */

// Erase all tasks displayed on the page
function clearTodolist () {
  const todoWrapper: HTMLUListElement | null = document.querySelector("ul");
  while(todoWrapper?.firstChild){
    todoWrapper.removeChild(todoWrapper.firstChild);
  }
}

/**
 * Check if todolist is empty
 * @param {Array<task>} todoList  
 */
function checkArrayEmpty(todoList: Array<task>) {
  const emptyMessage: HTMLElement | null = document.querySelector('#empty-state');
  const emptyMessageContent: HTMLElement | null = document.querySelector('#empty-state p');
  if (todoList.length == 0) {
    emptyMessage?.classList.add('show');
    const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
      if (buttonsFilter[1].checked) {
        if (emptyMessageContent) {
          emptyMessageContent.innerHTML = `No active tasks`;
        }
      } else if (buttonsFilter[2].checked) {
        if (emptyMessageContent) {
          emptyMessageContent.innerHTML = `No tasks completed`;
        }
      } else {
        if (emptyMessageContent) {
        emptyMessageContent.innerHTML = `Add a task to begin`;
        }
      }
  } else {
    emptyMessage?.classList.remove('show');
  }
}

// Display items left
function itemsLeft() {
  const todoListLeftUncompletedTasks = todoList.filter((task) => {
    return task.complete == false;
  });
  const itemAmout: HTMLElement | null = document.querySelector("#wrapper-item-amount p");
  if (itemAmout != null) {
    itemAmout.innerHTML = `${todoListLeftUncompletedTasks.length} items left`;
  }
}

/**
 * Display the todo list
 * @param {number} index Position dans la liste
 * @param {string} content Contenu de l'élément de la todo
 * @param {boolean} completed L'élément est-il fait ou non
 */
function createElement(index: number, content: String, completed: boolean = false) {
  const taskElement: HTMLLIElement = document.createElement("li");
  taskElement.innerHTML = `
    <svg class="reorder" width="8" height="18" viewBox="0 0 8 18" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="1.5" cy="1.5" r="1.5" fill="#494C6B"/><circle cx="6.5" cy="1.5" r="1.5" fill="#494C6B"/><circle cx="6.5" cy="6.5" r="1.5" fill="#494C6B"/><circle cx="1.5" cy="6.5" r="1.5" fill="#494C6B"/><circle cx="1.5" cy="11.5" r="1.5" fill="#494C6B"/><circle cx="1.5" cy="16.5" r="1.5" fill="#494C6B"/><circle cx="6.5" cy="11.5" r="1.5" fill="#494C6B"/><circle cx="6.5" cy="16.5" r="1.5" fill="#494C6B"/></svg>
    <input type="checkbox" name="${index}" id="todo-${index}" ${completed ? "checked " : ""}/>
    <label for="todo-${index}">${content}</label>
    <svg class="cross" id="${index}" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
    `;
  const todoWrapper: HTMLUListElement | null = document.querySelector("ul");
  todoWrapper?.appendChild(taskElement);
}

/**
 * Create the todo list with an array of task and
 * Display the todo list
 * @param {Array<task>} choosentodoList
 */
function createTodolist(choosentodoList: Array<task>) {
  clearTodolist();
  for (let i = 0; i < choosentodoList.length; i++) {
    let indexTask: number = choosentodoList[i].id;
    let contentTask: String = choosentodoList[i].nom;
    let completedTask: boolean = choosentodoList[i].complete;
    createElement(indexTask, contentTask, completedTask);
  }
  itemsLeft();
  checkArrayEmpty(choosentodoList);
  initCompleteTasks(choosentodoList);
  initDeleteTask();
  const buttonsFilter: NodeListOf<HTMLInputElement> | null = document.querySelectorAll('[name="filter"]');
  if (buttonsFilter[0].checked) {
    initSortable();
  }
  checkForDraggableIcon();
  initClearCompleted(); 
}



/**
 * The main function
 */

function main(): void {
  initThemeColorBtn();
  initAddTask();
  createTodolist(todoList);
  itemsLeft();
  initFilters(todoList);
  initSortable();
}

main();

/**
 * Made the file become a module
 * To use await at high level
 */
//export { };