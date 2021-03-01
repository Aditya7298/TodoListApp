import {
  renderAllTodosInDom,
  toggleTodoCompleteInDom,
  deleteTodoFromDom,
} from "./renderTodos.js";
import { displayEditForm, handleEdit } from "./editForm.js";
import { setProgress } from "./progressRing.js";
import { handleAddForm } from "./addForm.js";
import { undoLastEvent, redoLastEvent } from "./undoEvents.js";
import { filterTodosInDom } from "./filterForm.js";
import { displayDate } from "./displayDate.js";
import {
  toggleTodoSelected,
  deleteSelectedTodos,
  completeSelectedTodos,
} from "./bulkOperations.js";

displayDate();
renderAllTodosInDom();
setProgress();

const list = document.querySelector(".list");
const addTodoForm = document.querySelector("#addTodoForm");
const editTodoForm = document.querySelector("#editTodoForm");
const filterForm = document.querySelector("#filterTodoForm");
const cancelEditButton = document.querySelector("#cancelTodoEdit");
const modalBackground = document.querySelector(".modal-bg");
const filterResetButton = document.querySelector("#filterResetButton");
const bulkDelete = document.querySelector(".bulk-delete");
const bulkComplete = document.querySelector(".bulk-complete");

editTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleEdit(evt);
});

cancelEditButton.addEventListener("click", (evt) => {
  modalBackground.style.visibility = "hidden";
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  handleAddForm(evt);
});

filterForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  filterTodosInDom(evt);
});

filterResetButton.addEventListener("click", (evt) => {
  filterForm.todoImp.value = "all";
  filterForm.date.value = "";
  renderAllTodosInDom();
});

list.addEventListener("click", (evt) => {
  const todo = evt.target.parentElement;
  const todoIndex = Number(todo.dataset.id);
  const evtName = evt.target.name
    ? evt.target.name
    : evt.target.dataset.evtType;

  switch (evtName) {
    case "delete":
      deleteTodoFromDom(todoIndex);
      break;

    case "complete":
      toggleTodoCompleteInDom(todoIndex);
      break;

    case "edit":
      displayEditForm(todo);
      break;

    case "select":
      toggleTodoSelected(todo);
      break;
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.metaKey && evt.key === "z") {
    undoLastEvent();
  }
});

document.addEventListener("keydown", (evt) => {
  if (evt.metaKey && evt.key === "x") {
    redoLastEvent();
  }
});

bulkDelete.addEventListener("click", deleteSelectedTodos);
bulkComplete.addEventListener("click", completeSelectedTodos);
