const cardInput = document.querySelector("#cardInput");
const addCardBtn = document.querySelector("#addCardBtn");
const message = document.querySelector("#message");

const columns = {
  new: document.querySelector("#newCards"),
  work: document.querySelector("#workCards"),
  done: document.querySelector("#doneCards")
};

const statuses = ["new", "work", "done"];

function createCard(title, status = "new") {
  const card = document.createElement("article");
  const titleElement = document.createElement("div");
  const actions = document.createElement("div");

  card.className = "card";
  titleElement.className = "card-title";
  actions.className = "card-actions";

  titleElement.textContent = title;

  const statusIndex = statuses.indexOf(status);

  if (statusIndex > 0) {
    const backBtn = document.createElement("button");
    backBtn.textContent = "← Назад";
    backBtn.className = "move";
    backBtn.addEventListener("click", () => {
      moveCard(card, statuses[statusIndex - 1]);
    });
    actions.append(backBtn);
  }

  if (statusIndex < statuses.length - 1) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Вперёд →";
    nextBtn.className = "move";
    nextBtn.addEventListener("click", () => {
      moveCard(card, statuses[statusIndex + 1]);
    });
    actions.append(nextBtn);
  }

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Удалить";
  deleteBtn.className = "delete";
  deleteBtn.addEventListener("click", () => {
    card.remove();
    updateCounts();
    message.textContent = "Карточка удалена.";
  });

  actions.append(deleteBtn);
  card.append(titleElement, actions);
  columns[status].append(card);
  updateCounts();
}

function moveCard(card, newStatus) {
  const title = card.querySelector(".card-title").textContent;
  card.remove();
  createCard(title, newStatus);
  message.textContent = `Карточка перемещена в колонку "${getStatusName(newStatus)}".`;
}

function getStatusName(status) {
  return {
    new: "Новые",
    work: "В работе",
    done: "Готово"
  }[status];
}

function updateCounts() {
  Object.keys(columns).forEach(status => {
    const column = columns[status].parentElement;
    const count = column.querySelector(".count");
    count.textContent = columns[status].querySelectorAll(".card").length;
  });
}

function addCard() {
  const title = cardInput.value.trim();

  if (!title) {
    message.textContent = "Название карточки не может быть пустым.";
    message.style.color = "#dc2626";
    return;
  }

  createCard(title);
  cardInput.value = "";
  message.textContent = "Карточка добавлена.";
  message.style.color = "#16a34a";
  cardInput.focus();
}

addCardBtn.addEventListener("click", addCard);

cardInput.addEventListener("keydown", event => {
  if (event.key === "Enter") addCard();
});

// Творческая функция: горячая клавиша Ctrl + Enter добавляет карточку.
document.addEventListener("keydown", event => {
  if (event.ctrlKey && event.key === "Enter") {
    addCard();
  }
});

createCard("Подготовить проект", "new");
createCard("Проверить JavaScript", "work");
createCard("Сдать лабораторную", "done");
updateCounts();
