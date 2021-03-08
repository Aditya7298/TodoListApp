import Model from "./Model.js";
import View from "./View.js";
import UndoRedoHistory from "./history.js";
import { USERACTION } from "./constants.js";

export default class Controller {
  constructor(storedTodos) {
    this.model = new Model(storedTodos);
    this.view = new View(
      this.handleSelect,
      this.handleEdit,
      this.handleToggle,
      this.handleDelete,
      this.handleCreate,
      this.handleFilter,
      this.handleBulkDelete,
      this.handleBulkToggle,
      this.handleUndoRedo
    );
    this.view.renderTodosInDom(storedTodos);
    this.undoHistory = new UndoRedoHistory();
    this.redoHistory = new UndoRedoHistory();
    this.selectedTodos = new Set();
    this.filter = {
      date: "",
      importance: "All",
    };
  }

  popFromHistory = (historyObject, usingHistory) => {
    if (usingHistory) {
      if (historyObject === this.undoHistory) {
        this.redoHistory.pop();
      } else {
        this.undoHistory.pop();
      }
    }
  };

  handleFilter = (importance, date) => {
    this.filter.date = date;
    this.filter.importance = importance;
    const filteredTodos = this.model.readFilteredTodos(date, importance);
    this.view.renderTodosInDom(filteredTodos);
    this.handleProgressRing();
  };

  handleProgressRing = () => {
    const todoList = this.model.readFilteredTodos(
      this.filter.date,
      this.filter.importance
    );

    let completedTodos = 0,
      totalTodos = todoList.length;
    todoList.forEach((todo) => {
      if (todo.completed) {
        completedTodos += 1;
      }
    });

    this.view.setProgressRing(completedTodos, totalTodos);
  };

  handleSelect = (todoId) => {
    if (this.selectedTodos.has(todoId)) {
      this.selectedTodos.delete(todoId);
    } else {
      this.selectedTodos.add(todoId);
    }

    this.view.selectTodo(todoId);
  };

  handleCreate = (
    title,
    importance,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const currTodoList = this.model.readAllTodos();
    this.model.createTodo(
      title,
      importance,
      () => {
        const updatedTodoList = this.model.readFilteredTodos(
          this.filter.date,
          this.filter.importance
        );
        this.handleProgressRing();
        this.view.renderTodosInDom(updatedTodoList);
        this.popFromHistory(historyObject, usingHistory);
        historyObject.push({
          action: USERACTION.create,
          todoList: currTodoList,
        });
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  handleEdit = (
    todoId,
    title,
    importance,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const currTodo = this.model.readSingleTodo(todoId);
    const updatedtodo = { ...currTodo, title, importance };
    this.model.editTodo(
      todoId,
      updatedtodo,
      () => {
        this.view.editTodo(updatedtodo);
        this.popFromHistory(historyObject, usingHistory);
        historyObject.push({
          action: USERACTION.edit,
          todo: currTodo,
        });
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  handleToggle = (
    todoId,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    this.model.toggleTodo(
      todoId,
      () => {
        this.view.toggleTodo(todoId);
        this.handleProgressRing();
        this.popFromHistory(historyObject, usingHistory);
        historyObject.push({ action: USERACTION.toggle, todoId });
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  handleBulkToggle = (
    historyObject = this.undoHistory,
    usingHistory = false,
    todoIds = Array.from(this.selectedTodos)
  ) => {
    this.model.toggleBulkTodos(
      todoIds,
      () => {
        this.view.toggleBulkTodos(todoIds);
        this.handleProgressRing();
        this.popFromHistory(historyObject, usingHistory);
        todoIds.forEach((todoId) => {
          this.handleSelect(todoId);
        });
        historyObject.push({ action: USERACTION.bulktoggle, todoIds });
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  handleDelete = (
    todoId,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const currTodoList = this.model.readAllTodos();
    this.model.deleteTodo(
      todoId,
      () => {
        this.view.deleteTodo(todoId);
        this.handleProgressRing();
        this.popFromHistory(historyObject, usingHistory);
        historyObject.push({
          action: USERACTION.delete,
          todoList: currTodoList,
        });
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  handleBulkDelete = (historyObject = this.undoHistory, usingHistory) => {
    const todoIds = Array.from(this.selectedTodos);
    const currTodoList = this.model.readAllTodos();
    this.model.deleteBulkTodos(
      todoIds,
      () => {
        const updatedTodoList = this.model.readAllTodos();
        this.view.renderTodosInDom(updatedTodoList);
        this.handleProgressRing();
        this.popFromHistory(historyObject, usingHistory);
        historyObject.push({
          action: USERACTION.bulkdelete,
          todoList: currTodoList,
        });
        this.selectedTodos.clear();
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  changleTodoListState = (
    prevTodoList,
    historyObject = this.undoHistory,
    usingHistory
  ) => {
    const currTodoList = this.model.readAllTodos();
    this.model.changeTodoStoreState(
      prevTodoList,
      () => {
        const filteredTodos = this.model.readFilteredTodos(
          this.filter.date,
          this.filter.importance
        );
        this.view.renderTodosInDom(filteredTodos);
        this.handleProgressRing();
        this.popFromHistory(historyObject, usingHistory);
        historyObject.push({
          action: USERACTION.changestate,
          todoList: currTodoList,
        });
      },
      () => {
        this.view.showSnackbar();
      }
    );
  };

  handleUndoRedo = (Event) => {
    let readHistoryObject, passHistoryObject;

    if (Event === USERACTION.undo) {
      readHistoryObject = this.undoHistory;
      passHistoryObject = this.redoHistory;
    } else {
      readHistoryObject = this.redoHistory;
      passHistoryObject = this.undoHistory;
    }

    const lastEventInHistory = readHistoryObject.top();
    if (!lastEventInHistory) {
      console.log("No event in history");
      return;
    }

    switch (lastEventInHistory.action) {
      case USERACTION.edit:
        const prevTodo = lastEventInHistory.todo;
        this.handleEdit(
          prevTodo.id,
          prevTodo.title,
          prevTodo.importance,
          passHistoryObject,
          true
        );
        break;

      case USERACTION.toggle:
        const todoId = lastEventInHistory.todoId;
        this.handleToggle(todoId, passHistoryObject, true);
        break;

      case USERACTION.bulktoggle:
        const todoIds = lastEventInHistory.todoIds;
        this.handleBulkToggle(passHistoryObject, true, todoIds);
        break;

      default:
        const prevTodoList = lastEventInHistory.todoList;
        this.changleTodoListState(prevTodoList, passHistoryObject, true);
    }
  };
}
