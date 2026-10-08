const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const clearCompletedBtn = document.querySelector("#clearCompletedBtn");
const taskList = document.querySelector("#taskList");
const stats = document.querySelector("#stats");
const message = document.querySelector("#message");
const filterButtons = document.querySelectorAll("[data-filter]");

let currentFilter = "all";

function updateStats() {
  const tasks = document.querySelectorAll("#taskList li");
  const completed = document.querySelectorAll("#taskList li.completed");
  stats.textContent = `Задач: ${tasks.length} | Выполнено: ${completed.length}`;
}

function applyFilter() {
  const tasks = document.querySelectorAll("#taskList li");

  tasks.forEach(task => {
    const isCompleted = task.classList.contains("completed");
    const visible =
      currentFilter === "all" ||
      (currentFilter === "active" && !isCompleted) ||
      (currentFilter === "completed" && isCompleted);

    task.style.display = visible ? "flex" : "none";
  });

  filterButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === currentFilter);
  });
}

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    message.textContent = "Задача не может быть пустой.";
    message.style.color = "#dc2626";
    return;
  }

  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteBtn = document.createElement("button");

  span.textContent = text;
  span.className = "task-text";
  deleteBtn.textContent = "Удалить";
  deleteBtn.className = "delete";

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStats();
    applyFilter();
  });

  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStats();
    applyFilter();
  });

  li.append(span, deleteBtn);
  taskList.append(li);

  taskInput.value = "";
  message.textContent = "Задача добавлена.";
  message.style.color = "#16a34a";
  updateStats();
  applyFilter();
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addTask();
});

clearCompletedBtn.addEventListener("click", () => {
  document.querySelectorAll("#taskList li.completed").forEach(task => task.remove());
  updateStats();
  applyFilter();
  message.textContent = "Выполненные задачи очищены.";
});

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    applyFilter();
  });
});

updateStats();
applyFilter();
