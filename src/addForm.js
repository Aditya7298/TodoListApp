import { addNewTodoInDom } from "./renderTodos.js";

const addTodoForm = document.querySelector("#addTodoForm");

export const handleAddForm = (evt) => {
  evt.preventDefault();
  const todoTitle = evt.target.todoText.value;
  const todoImportance = evt.target.todoImp.value;
  evt.target.todoText.value = "";
  addNewTodoInDom(todoTitle, todoImportance);
};
