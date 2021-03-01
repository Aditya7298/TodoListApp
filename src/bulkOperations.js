import {
  deleteSelectedTodosInDom,
  toggleSelectedTodosCompleteInDom,
} from "./renderTodos.js";

const selectedTodos = new Set();
const list = document.querySelector(".list");

const getSelectedTodosFromDom = () => {
  const selectedTodosInDom = [];
  Array.from(list.children).forEach((todo) => {
    if (selectedTodos.has(Number(todo.dataset.id))) {
      selectedTodosInDom.push(todo);
    }
  });
  return selectedTodosInDom;
};

export const toggleTodoSelected = (todo) => {
  const selectButton = todo.children[6];
  const todoId = Number(todo.dataset.id);
  selectButton.classList.toggle("todo-selectbutton-selected");
  if (selectedTodos.has(todoId)) {
    selectedTodos.delete(todoId);
  } else {
    selectedTodos.add(todoId);
  }

  // console.log(selectedTodos);
};

export const deleteSelectedTodos = () => {
  if (deleteSelectedTodosInDom(Array.from(selectedTodos), true, false)) {
    getSelectedTodosFromDom().forEach((todo) => {
      toggleTodoSelected(todo);
    });
    selectedTodosInDom.clear();
  }
};

export const completeSelectedTodos = () => {
  if ((toggleSelectedTodosCompleteInDom(Array.from(selectedTodos)), true)) {
    getSelectedTodosFromDom().forEach((todo) => {
      console.log(todo);
      toggleTodoSelected(todo);
    });
    selectedTodos.clear();
  }
};
