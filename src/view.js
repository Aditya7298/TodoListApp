import { USERACTION } from "./constants.js";
import { createTodoInDom } from "./views/DOMutils.js";
import addForm from "./views/addForm.js";
import editForm from "./views/editForm.js";
import filterForm from "./views/filterForm.js";
import todoDomHandler from "./views/todo.js";
import navbarDate from "./views/navbarDate.js";
import progressRing from "./views/progressRing.js";

export default class View {
  constructor(
    selectCallback,
    editCallback,
    toggleCallback,
    deleteCallback,
    createCallback,
    filterCallback,
    bulkDeleteCallback,
    bulkToggleCallback,
    undoRedoCallback
    // bulkAddCallback
  ) {
    this.editCallback = editCallback;
    this.toggleCallback = toggleCallback;
    this.deleteCallback = deleteCallback;
    this.selectCallback = selectCallback;
    this.createCallback = createCallback;
    this.filterCallback = filterCallback;
    this.bulkDeleteCallback = bulkDeleteCallback;
    this.bulkToggleCallback = bulkToggleCallback;
    this.undoRedoCallback = undoRedoCallback;

    this.Init();
  }

  Init = () => {
    navbarDate.displayDate();

    addForm.Init();
    const addFormInDom = document.querySelector(".sidebar-addform");
    addFormInDom.addEventListener("submit", (evt) => {
      this.handleCreateTodo(evt);
    });

    filterForm.Init();
    const filterFormInDom = document.querySelector(".sidebar-filterform");
    filterFormInDom.addEventListener("submit", (evt) => {
      const { date, importance } = filterForm.handleSubmit(evt);
      this.filterCallback(importance, date);
    });
    const filterResetButton = document.querySelector(".filterform-resetbutton");
    filterResetButton.addEventListener("click", (evt) => {
      this.filterCallback("All", "");
    });

    const bulkDeleteButton = document.querySelector(".bulk-delete__button");
    bulkDeleteButton.addEventListener("click", (evt) => {
      this.bulkDeleteCallback();
    });

    const bulkToggleButton = document.querySelector(".bulk-toggle__button");
    bulkToggleButton.addEventListener("click", (evt) => {
      this.bulkToggleCallback();
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.metaKey && evt.key === "z") {
        this.undoRedoCallback(USERACTION.undo);
      }
    });

    document.addEventListener("keydown", (evt) => {
      if (evt.metaKey && evt.key === "x") {
        this.undoRedoCallback(USERACTION.redo);
      }
    });

    progressRing.Init(2, 3);
  };

  renderTodosInDom = (todoList) => {
    const todoListContainer = document.querySelector(".container-todolist");
    todoListContainer.innerHTML = "";

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

      const selectButton = document.querySelector(
        `[data-todo="${todo.id}_${USERACTION.select}"]`
      );

      toggleButton.addEventListener("click", (evt) => {
        this.handleToggleClick(todo.id, evt);
      });

      editButton.addEventListener("click", (evt) => {
        this.handleEditClick(todo.id, evt);
      });

      deleteButton.addEventListener("click", (evt) => {
        this.handleDeleteClick(todo.id, evt);
      });

      selectButton.addEventListener("click", (evt) => {
        this.handleSelectClick(todo.id, evt);
      });
    });
  };

  handleSelectClick = (todoId, evt) => {
    this.selectCallback(todoId);
  };

  handleToggleClick = (todoId, evt) => {
    this.toggleCallback(todoId);
  };

  handleEditClick = (todoId, evt) => {
    const todoInDom = document.querySelector(`[data-id="${todoId}"]`);
    editForm.Init(todoInDom);
    const editFormInDom = document.querySelector(".modal-editform");
    editFormInDom.addEventListener("submit", (evt) => {
      const { title, importance } = { ...editForm.handleSubmit(evt) };
      if (this.editCallback(todoId, title, importance)) {
        todoDomHandler.editTodoInDom(todoId, title, importance);
      }
    });
  };

  handleDeleteClick = (todoId, evt) => {
    this.deleteCallback(todoId);
  };

  handleCreateTodo = (evt) => {
    const { title, importance } = { ...addForm.handleSubmit(evt) };
    this.createCallback(title, importance);
  };

  selectTodo = (todoId) => {
    todoDomHandler.selectTodoInDom(todoId);
  };

  editTodo = (todoObject) => {
    todoDomHandler.editTodoInDom(
      todoObject.id,
      todoObject.title,
      todoObject.importance
    );
  };

  toggleTodo = (todoId) => {
    todoDomHandler.toggleTodoInDom(todoId);
  };

  toggleBulkTodos = (todoIds) => {
    todoDomHandler.toggleBulkTodosInDom(todoIds);
  };

  deleteTodo = (todoId) => {
    todoDomHandler.deleteTodoFromDom(todoId);
  };

  setProgressRing = (completedTodos, totalTodos) => {
    progressRing.setProgressRing(completedTodos, totalTodos);
  };
}
