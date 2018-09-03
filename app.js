// define  UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listiners
loadEventListeners();

function loadEventListeners() {
  //dom load event
  document.addEventListener('DOMContentLoaded',getTasks);
  //add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTasks);
  //filter tasks event
  filter.addEventListener('keyup', filterTasks);
}
//get tasks from ls
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task){
    //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(task));
  //create new link element
  const link = document.createElement('a')
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  });
}



//add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  //create li element
  const li = document.createElement('li');
  //add class
  li.className = 'collection-item';
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement('a')
  link.className = 'delete-item secondary-content';
  //add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //store in localstorage
  storeTaskInLOcalStorage(taskInput.value);

  //clear input
  taskInput.value = '';

  e.preventDefault();
}

//store task in local storage
function storeTaskInLOcalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}



//Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are You Sure?')) {
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalstorage(e.target.parentElement.parentElement)
    }
  }
}  

//remove from localstorage
function removeTaskFromLocalstorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  })

  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// clear tasks
function clearTasks() {
  //taskList.innerHTML = '';

  //faster way
  if (confirm('Are you sure?')) {
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
    }
  }

  //clearTasks from local storage
  clearTasksFromLocalStorage();
}

//clearTasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

//filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block'
    } else {
      task.style.display = 'none'
    }
  });
}