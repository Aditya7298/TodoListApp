import { USERACTION } from "./constants.js";
import { createTodoInDom } from "./views/DOMutils.js";
import addForm from "./views/addForm.js";
import editForm from "./views/editForm.js";
import todo from "./views/todo.js";
import navbarDate from "./views/navbarDate.js";

export default class View {
  constructor(
    editCallback,
    toggleCallback,
    deleteCallback,
    bulkDeleteCallback,
    bulkToggleCallback,
    bulkAddCallback
  ) {
    this.addForm = addForm;
    this.editForm = editForm;
    this.todo = todo;

    navbarDate.displayDate();
    addForm.Init();
  }

  renderTodosInDom = (todoList) => {
    const todoListContainer = document.querySelector(".container-todolist");

    todoList.forEach((todo) => {
      const newTodoInDom = createTodoInDom(todo);
      todoListContainer.append(newTodoInDom);

      const toggleButton = document.querySelector(
        `[data-todo="${todo.id}_${USERACTION.toggle}"]`
      );

      const editButton = document.querySelector(
        `[data-todo="${todo.id}_${USERACTION.edit}"]`
      );
      const deleteButton = document.querySelector(
        `[data-todo="${todo.id}_${USERACTION.delete}"]`
      );

      toggleButton.addEventListener("click", (evt) => {
        this.handleToggleClick(todo.id, evt);
      });

      editButton.addEventListener("click", (evt) => {
        this.handleEditClick(todo.id, evt);
      });

      deleteButton.addEventListener("click", (evt) => {
        this.handleDeleteClick(evt);
      });
    });
  };

  handleToggleClick = (todoId, evt) => {
    const todoInDom = document.querySelector(`[data-id="${todoId}"]`);
    if (toggleCallback(todoId)) {
      todo.toggleTodoInDom(todoInDom);
    }
  };

  handleEditClick = (todoId, evt) => {
    const todoInDom = document.querySelector(`[data-id="${todoId}"]`);
    this.editForm.Init(todoInDom);
  };

  handleDeleteClick = (evt) => {
    console.log(evt);
  };
}
