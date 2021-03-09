import { createTodoInDom } from "./DOMutils.js";
import { USERACTION, IMPORTANCEICONCLASSES } from "../constants.js";

const editTodoInDom = (todoId, todoTitle, todoImportance) => {
  const todoInDom = document.querySelector(`[data-id="${todoId}"]`);

  todoInDom.dataset.title = todoTitle;
  todoInDom.dataset.importance = todoImportance;

  const todoTitleInDom = document.querySelector(
    `[data-todo="${todoId}_title"]`
  );
  todoTitleInDom.textContent = todoTitle;

  const todoImpIcon = document.querySelector(
    `[data-todo="${todoId}_importance"]`
  );

  todoImpIcon.classList = `todo-importance ${IMPORTANCEICONCLASSES[todoImportance]}`;
};

const selectTodoInDom = (todoId) => {
  const todoSelectButton = document.querySelector(
    `[data-todo="${todoId}_${USERACTION.SELECT}"]`
  );

  todoSelectButton.classList.toggle("todo-selectbutton-selected");
};

const toggleTodoInDom = (todoId) => {
  const todoInDom = document.querySelector(`[data-id="${todoId}"]`);

  const todoTitleInDom = document.querySelector(
    `[data-todo="${todoId}_title"]`
  );

  todoInDom.dataset.completed = !Boolean(todoInDom.dataset.completed)
    ? "true"
    : "false";

  todoTitleInDom.classList.toggle("todo-completed");
};

const toggleBulkTodosInDom = (todoIds) => {
  todoIds.forEach((todoId) => {
    const todoTitleInDom = document.querySelector(
      `[data-todo="${todoId}_title"]`
    );
    todoTitleInDom.classList.toggle("todo-completed");
  });
};

const deleteTodoFromDom = (todoId) => {
  const todoInDom = document.querySelector(`[data-id="${todoId}"]`);

  todoInDom.remove();
};

const deleteBulkTodosFromDom = (todoList) => {
  todoList.forEach((todo) => {
    const todoInDom = document.querySelector(`[data-id="${todo.id}"]`);

    todoInDom.remove();
  });
};

export default {
  createTodoInDom,
  editTodoInDom,
  toggleTodoInDom,
  toggleBulkTodosInDom,
  deleteTodoFromDom,
  deleteBulkTodosFromDom,
  selectTodoInDom,
};
