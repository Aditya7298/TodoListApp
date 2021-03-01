import { readSingleTodo } from "./database.js";
import { updateTodoInDom } from "./renderTodos.js";

const modalBackground = document.querySelector(".modal-bg");
const editTodoForm = document.querySelector("#editTodoForm");
let todoId;

export const handleEdit = (evt) => {
  const newTitle = evt.target.title.value;
  const newImportance = evt.target.imp.value;
  updateTodoInDom(todoId, newTitle, newImportance);
  modalBackground.style.visibility = "hidden";
};

export const displayEditForm = (todoInDom) => {
  todoId = Number(todoInDom.dataset.id);
  readSingleTodo(todoId)
    .then((todoObject) => {
      editTodoForm.title.value = todoObject.title;
      editTodoForm.imp.value = todoObject.importance;
      modalBackground.style.visibility = "visible";
    })
    .catch((err) => {
      //Handle Error
    });
};
