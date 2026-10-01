const counterValueSpan = document.querySelector("#counter-value");
const btnDecrease = document.querySelector("#btn-decrease");
const btnReset = document.querySelector("#btn-reset");
const btnIncrease = document.querySelector("#btn-increase");

let count = localStorage.getItem("counterCount") ? parseInt(localStorage.getItem("counterCount")) : 0;
updateCounterDOM();

function updateCounterDOM() {
    counterValueSpan.textContent = count;
    localStorage.setItem("counterCount", count); // Творческое задание: сохранение в памяти браузера
}

btnIncrease.addEventListener("click", () => {
    count++;
    updateCounterDOM();
});

btnDecrease.addEventListener("click", () => {
    count--;
    updateCounterDOM();
});

btnReset.addEventListener("click", () => {
    count = 0;
    updateCounterDOM();
});







const purchaseInput = document.querySelector("#purchase-input");
const btnAddPurchase = document.querySelector("#btn-add-purchase");
const btnClearPurchase = document.querySelector("#btn-clear-purchase");
const purchaseList = document.querySelector("#purchase-list");

let purchases = JSON.parse(localStorage.getItem("purchasesList")) || [];
renderPurchases();

function renderPurchases() {
    purchaseList.innerHTML = "";
    // Цикл для перебора массива
    purchases.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${item}`;
        purchaseList.appendChild(li);
    });
    localStorage.setItem("purchasesList", JSON.stringify(purchases)); // Творческое задание
}

btnAddPurchase.addEventListener("click", () => {
    const text = purchaseInput.value.trim();
    // Условие проверки ввода
    if (text !== "") {
        purchases.push(text);
        purchaseInput.value = "";
        renderPurchases();
    } else {
        alert("Поле ввода не должно быть пустым!");
    }
});

btnClearPurchase.addEventListener("click", () => {
    purchases = [];
    renderPurchases();
});








const taskInput = document.querySelector("#task-input");
const btnAddTask = document.querySelector("#btn-add-task");
const taskList = document.querySelector("#task-list");
const completedCountSpan = document.querySelector("#completed-count");
const uncompletedCountSpan = document.querySelector("#uncompleted-count");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
renderTasks();

function renderTasks() {
    taskList.innerHTML = "";
    let completedCount = 0;
    let uncompletedCount = 0;

    tasks.forEach((task, index) => {
        if (task.completed) {
            completedCount++;
        } else {
            uncompletedCount++;
        }

        const li = document.createElement("li");
        li.className = "task-item";

        // Текст задачи со стилем выполнения
        const span = document.createElement("span");
        span.textContent = task.text;
        if (task.completed) {
            span.classList.add("completed");
        }


        



        const btnContainer = document.createElement("div");

        const btnToggle = document.createElement("button");
        btnToggle.textContent = task.completed ? "Отменить" : "Готово";
        btnToggle.style.backgroundColor = task.completed ? "#f39c12" : "#2ecc71";
        btnToggle.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            renderTasks();
        });

        const btnDelete = document.createElement("button");
        btnDelete.textContent = "Удалить";
        btnDelete.className = "danger-btn";
        btnDelete.addEventListener("click", () => {
            tasks.splice(index, 1);
            renderTasks();
        });

        btnContainer.appendChild(btnToggle);
        btnContainer.appendChild(btnDelete);

        li.appendChild(span);
        li.appendChild(btnContainer);
        taskList.appendChild(li);
    });


    

    completedCountSpan.textContent = completedCount;
    uncompletedCountSpan.textContent = uncompletedCount;


    





    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

btnAddTask.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text !== "") {
        tasks.push({ text: text, completed: false });
        taskInput.value = "";
        renderTasks();
    } else {
        alert("Введите текст задачи!");
    }
});