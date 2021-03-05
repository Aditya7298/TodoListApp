import { createTodoInDom } from "./DOMutils.js";

const editTodoInDom = (todo) => {
  const todoInDom = document.querySelector(`[data-id=${todo.id}]`);

  todoInDom.dataset.title = todo.title;
  todoInDom.dataset.importance = todo.importance;

  const todoTitleInDom = document.querySelector(`[data-todo=${todo.id}-title]`);
  todoTitleInDom.textContent = todo.title;

  const todoImpIcon = document.querySelector(
    `[data-todo=${todo.id}-importance]`
  );

  todoImpIcon.classList = `todo-importance todo-importance-${todo.importance}`;
};

const toggleTodoInDom = (todo) => {
  const todoTitleInDom = document.querySelector(`[data-todo=${todo.id}-title]`);
  todoTitleInDom.classList.toggle("todo-completed");
};

const toggleBulkTodosInDom = (todoList) => {
  todoList.forEach((todo) => {
    const todoTitleInDom = document.querySelector(
      `[data-todo=${todo.id}-title]`
    );
    todoTitleInDom.classList.toggle("todo-completed");
  });
};

const deleteTodoFromDom = (todo) => {
  const todoInDom = (todoInDom = document.querySelector(
    `[data-id=${todo.id}]`
  ));

  todoInDom.remove();
};

const deleteBulkTodosFromDom = (todoList) => {
  todoList.forEach((todo) => {
    const todoInDom = (todoInDom = document.querySelector(
      `[data-id=${todo.id}]`
    ));

    todoInDom.remove();
  });
};

// const bindCallbackToTodoButtons = (callback) => {
//     const todoButtons = document.querySelectorAll(".todo button");
//     todoButtons.forEach(todoButton => {
//         todoButton.
//     })
// }

export default {
  createTodoInDom,
  editTodoInDom,
  toggleTodoInDom,
  deleteTodoFromDom,
  deleteBulkTodosFromDom,
};
