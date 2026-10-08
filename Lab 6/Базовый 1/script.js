const input = document.querySelector("#itemInput");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const list = document.querySelector("#shoppingList");
const counter = document.querySelector("#counter");
const message = document.querySelector("#message");

function updateCounter() {
  const items = document.querySelectorAll("#shoppingList li");
  const completed = document.querySelectorAll("#shoppingList li.completed");
  counter.textContent = `Всего товаров: ${items.length}, куплено: ${completed.length}`;
}

function addItem() {
  const text = input.value.trim();

  if (!text) {
    message.textContent = "Введите название товара.";
    message.style.color = "#dc2626";
    return;
  }

  const item = document.createElement("li");
  item.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Удалить";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    item.remove();
    updateCounter();
    message.textContent = "Товар удалён.";
    message.style.color = "#475569";
  });

  item.append(deleteBtn);

  item.addEventListener("click", () => {
    item.classList.toggle("completed");
    updateCounter();
  });

  list.append(item);
  input.value = "";
  message.textContent = "Товар добавлен.";
  message.style.color = "#16a34a";
  updateCounter();
  input.focus();
}

addBtn.addEventListener("click", addItem);

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") addItem();
});

clearBtn.addEventListener("click", () => {
  list.innerHTML = "";
  updateCounter();
  message.textContent = "Список очищен.";
});

updateCounter();
