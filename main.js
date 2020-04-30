// Setting UP Variables
let inp = document.querySelector(".inp"),
  addBtn = document.querySelector(".add-task .add"),
  tasksContent = document.querySelector(".task-content"),
  countTask = document.querySelector(".counter"),
  completedTask = document.querySelector(".completed"),
  delteAll = document.querySelector(".delete-all"),
  finishAll = document.querySelector(".finish-all");
// Setting Vars && Get Data From LocalStorage
const tasks = JSON.parse(localStorage.getItem("Tasks"))
  ? JSON.parse(localStorage.getItem("Tasks"))
  : [];

// Foucs In Fild
window.onload = function() {
  inp.focus();

  if (tasks.length === 0) {
    noMsg();
  } else {
    clcTaks();
  }
};

// Add Task
function addTask() {
  // Checked For Val
  if (inp.value == "") {
    // Seet Alret
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Can`t Add To Epmty  !"
    });
  } else {
    // Show Massge No Tasks
    noTask = document.querySelector(".no-msg");

    if (document.body.contains(document.querySelector(".no-msg"))) {
      // Remove No Task Mas
      noTask.remove();
    }

    // Checked Value In Tasks
    checked();
    // input To  Epmty
    inp.value = "";
  }
  // input To Focus
  inp.focus();
  clcTaks();
}
addBtn.addEventListener("click", addTask);

// Create Ele
function createEle(text) {
  // Create Vars && Elements
  let mainDiv = document.createElement("div"),
    mainSpan = document.createElement("span"),
    deletText = document.createElement("span");

  // Add Text To Eleme
  mainSpan.textContent = text;
  deletText.textContent = "Delete";

  // Add Class To Eleme
  mainDiv.className = "task-box";
  mainSpan.className = "text-task";
  deletText.className = "delete-task";

  // Set Id For Box
  for (i = 0; i <= tasksContent.childElementCount; i++) {
    mainDiv.id = i;
    deletText.id = i;
  }
  // Append Eleme
  mainDiv.append(mainSpan);
  mainDiv.append(deletText);

  // Append To Body
  tasksContent.append(mainDiv);
}

// Show Data To Body
tasks.map(task => {
  createEle(task);
});

// Delete Task && Finish Task
document.addEventListener("click", function(e) {
  // Delete Task
  if (e.target.className == "delete-task") {
    e.target.parentNode.remove();

    // Detele Taks From LocalStorage
    data = JSON.parse(localStorage.getItem("Tasks"));
    arryI = [];
    data.map(item => {
      arryI.push(item);
    });
    newData = arryI.splice(e.target.id, 1);
    localStorage.setItem("Tasks", JSON.stringify(arryI));

    // Show No Msg
    if (tasksContent.childElementCount == 0) {
      noMsg();
    }
  }

  // Toggle Class Finish Task
  if (e.target.classList.contains("text-task")) {
    e.target.classList.toggle("finish");
  }
// Srtat Clc Tasks
  clcTaks();
});

// Create No Msg
function noMsg() {
  // Create Span
  const mgsSpan = document.createElement("span");
  // Add Text To Span
  mgsSpan.textContent = "No Task To Show";
  // Add Class To Span
  mgsSpan.className = "no-msg";
  // Appned Span To Body
  tasksContent.append(mgsSpan);
}

// Delete All Tasks
function deleteAllTask() {
  const all = document.querySelectorAll(".task-box .text-task");
  all.forEach(task => {
    task.parentNode.remove();
    localStorage.clear();
  });

  if (tasksContent.childElementCount == 0) {
    noMsg();
  }
  clcTaks();
}
delteAll.addEventListener("click", deleteAllTask);

// Finish All Tasks
function finishAllTask() {
  const all = document.querySelectorAll(".task-box .text-task");
  all.forEach(task => {
    task.classList.toggle("finish");
  });
  clcTaks();
}

finishAll.addEventListener("click", finishAllTask);

// Function To Clc Task
function clcTaks() {
  const tasksCount = document.querySelectorAll(".task-box ").length;
  const tasksFinished = document.querySelectorAll(".task-box .finish").length;
  countTask.textContent = tasksCount;
  completedTask.textContent = tasksFinished;
}

// Checked Value In Tasks
function checked() {
  let spans = document.querySelectorAll(".task-box .text-task"),
    allta = [];
  spans.forEach(span => {
    allta.push(span.textContent);
  });
  let Tasks = allta.indexOf(inp.value, 0);
  if (inp.value == allta[Tasks]) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Can`t Add The Task One More !"
    });
  } else {
    // Set Data To LocalStorage
    tasks.push(inp.value);
    createEle(inp.value);
    localStorage.setItem("Tasks", JSON.stringify(tasks));
  }
}
