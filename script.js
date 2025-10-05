const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskTable = document.getElementById("taskTable");

// Load saved tasks on page load
window.addEventListener("DOMContentLoaded", loadTasks);

// Add new task
addBtn.addEventListener("click", () => {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task!");
    return;
  }
  const task = { text, status: "To Do" };
  addTaskToTable(task);
  saveTask(task);
  taskInput.value = "";
});

// Create a table row for a task
function addTaskToTable(task) {
  const tr = document.createElement("tr");
  tr.classList.add(`status-${task.status.replace(" ", "")}`);

  // Task text cell
  const tdText = document.createElement("td");
  tdText.textContent = task.text;

  // Status dropdown cell
  const tdStatus = document.createElement("td");
  const select = document.createElement("select");
  ["To Do", "In Progress", "In Review", "Completed"].forEach((status) => {
    const opt = document.createElement("option");
    opt.value = status;
    opt.textContent = status;
    if (status === task.status) opt.selected = true;
    select.appendChild(opt);
  });
  select.addEventListener("change", () => {
    task.status = select.value;
    tr.className = "";
    tr.classList.add(`status-${task.status.replace(" ", "")}`);
    updateLocalStorage();
  });
  tdStatus.appendChild(select);

  // Delete button
  const tdAction = document.createElement("td");
  const delBtn = document.createElement("button");
  delBtn.textContent = "✖";
  delBtn.classList.add("delete");
  delBtn.addEventListener("click", () => {
    tr.remove();
    updateLocalStorage();
  });
  tdAction.appendChild(delBtn);

  tr.appendChild(tdText);
  tr.appendChild(tdStatus);
  tr.appendChild(tdAction);

  taskTable.appendChild(tr);
}

// Save tasks to local storage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((t) => addTaskToTable(t));
}

// Update local storage (after change/delete)
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskTable tr").forEach((row) => {
    const text = row.children[0].textContent;
    const status = row.children[1].querySelector("select").value;
    tasks.push({ text, status });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
