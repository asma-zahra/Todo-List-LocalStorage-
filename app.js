const todoform = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTasks = document.querySelector("#Total-tasks");
const remainingTasks = document.querySelector("#remaining-tasks");
const completedTasks = document.querySelector("#completed-tasks");
const mainInput = document.querySelector("#todo-form input");

// search task in local storage which has key tasks if not found store empty array to tasks variable 
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// once task is set in local storage with key tasks the loop it and show task so that if we refresh the page task still show from loacl storage
/ =========================SHOW TASK from LOCAL STORAGE=================================/
if (localStorage.getItem("tasks")) {
  tasks.map((show) => {
    createTask(show);
  });
}
/ =========================CREATE TASK ON SUBMIT=================================/

todoform.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputValue = mainInput.value;
  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isCompleted: false,
  };
  // When we submit the form it will create an object and push this in empty array which created above which value will be set in local storage 
  console.log(task);
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // create a task and call this fnc on submit, then reset form and apply again focus to input
  createTask(task);
  todoform.reset();
  mainInput.focus();
});
function createTask(task) {
  // create task list (li) and append into ul which is todolist
  const taskel = document.createElement("li");
  taskel.setAttribute("id", task.id);
  if (task.isCompleted) {
    taskel.classList.add("compltete");
  }
  const textMarkup = `<div>
    <input type="checkbox" name="tasks" id="${task.id}" ${
    task.isCompleted ? "checked" : ""
  } />
    <span ${!task.isCompleted ? "contenteditable" : ""}>${task.name}</span>
  </div>
  <button title="remove ${task.name}" class="remove-task">
    <img src="img/cross.png" alt="" />
  </button>`;
  taskel.innerHTML = textMarkup;
  todoList.appendChild(taskel);
  countstatus();
}
/ =========================COUNT STATUS OF TASK =================================/

function countstatus() {
  // store all the task which is in array of local storage then filter which have iscompleted true and get count using length property
  const totalTasksArray = tasks;
  const completedTask = totalTasksArray.filter((task) => task.isCompleted === true
  );

  totalTasks.innerHTML = totalTasksArray.length;
  completedTasks.innerHTML = completedTask.length;
  remainingTasks.innerHTML = totalTasksArray.length - completedTask.length;
}

/================ REMOVE TASK=====================/

todoList.addEventListener('click', (e)=>{
  if(e.target.classList.contains('remove-task') ||e.target.parentElement.classList.contains('remove-task') || e.target.parentElement.parentElement.classList.contains('remove-task') ){
      // get button ke close li ki id
      const itemid = e.target.closest('li').id
      // remove this id
      removeItem(itemid);
  }
});
function removeItem(removeitemid){
console.log(removeitemid);
// take filter out from task array from local storage and save it orrrride in tasks array
// then set local storage 
// remove that id from ui
tasks = tasks.filter((rem)=> rem.id !== parseInt(removeitemid)
   
)
localStorage.setItem("tasks", JSON.stringify(tasks));
document.getElementById(removeitemid).remove();
countstatus();
}

/================ UPDATE TASK=====================/
todoList.addEventListener('input', (e)=>{
    const itemid = e.target.closest('li').id;
    updateTask(itemid, e.target);
});

function updateTask(itemid , ele){
    console.log(itemid);
    // find that id  in which task is being edited
   const  task = tasks.find((task)=>task.id == parseInt(itemid))
  console.log(task);
    // target element has attribute editible then test.name jo span me hai usse change krege cuurent text se
    if(ele.hasAttribute('contenteditable')){
        task.name = ele.textContent;
    }else{
        const span = ele.nextElementSibling;
        const parent = ele.closest('li');
        task.isCompleted = !task.isCompleted
        if(task.isCompleted){
            span.removeAttribute('contenteditable');
            parent.classList.add('complete')
        }else{
            span.setAttribute('contenteditable' , true);
            parent.classList.remove('complete')
        }
    }
    // after local storage update local storage and count
    localStorage.setItem("tasks", JSON.stringify(tasks));
    countstatus();
}

/================EXIT EDIT MODE=====================/
todoList.addEventListener("keydown" , (e)=>{
  if(e.keyCode === 13){
    e.preventDefault(); // when we hit enter (enter code is keyCode==13)it will not go to new line
    e.target.blur(); //to remove focus when enter
  }
  
})