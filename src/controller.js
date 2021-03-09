import Model from "./model.js";
import View from "./view.js";
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

  handleCreate = async (
    title,
    importance,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const currTodoList = this.model.readAllTodos();
    const modelResponse = await this.model.createTodo(title, importance);
    if (modelResponse) {
      const updatedTodoList = this.model.readFilteredTodos(
        this.filter.date,
        this.filter.importance
      );
      this.handleProgressRing();
      this.view.renderTodosInDom(updatedTodoList);
      this.popFromHistory(historyObject, usingHistory);
      historyObject.push({
        action: USERACTION.CREATE,
        todoList: currTodoList,
      });
    } else {
      this.view.showSnackbar();
    }
  };

  handleEdit = async (
    todoId,
    title,
    importance,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const currTodo = this.model.readSingleTodo(todoId);
    const updatedtodo = { title, importance };
    const modelResponse = await this.model.editTodo(todoId, updatedtodo);
    if (modelResponse) {
      this.view.editTodo({ ...currTodo, ...updatedtodo });
      this.popFromHistory(historyObject, usingHistory);
      historyObject.push({
        action: USERACTION.EDIT,
        todo: currTodo,
      });
    } else {
      this.view.showSnackbar();
    }
  };

  handleToggle = async (
    todoId,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const modelResponse = await this.model.toggleTodo(todoId);
    if (modelResponse) {
      this.view.toggleTodo(todoId);
      this.handleProgressRing();
      this.popFromHistory(historyObject, usingHistory);
      historyObject.push({ action: USERACTION.TOGGLE, todoId });
    } else {
      this.view.showSnackbar();
    }
  };

  handleBulkToggle = async (
    historyObject = this.undoHistory,
    usingHistory = false,
    todoIds = Array.from(this.selectedTodos)
  ) => {
    const modelResponse = await this.model.toggleBulkTodos(todoIds);
    if (modelResponse) {
      this.view.toggleBulkTodos(todoIds);
      this.handleProgressRing();
      this.popFromHistory(historyObject, usingHistory);
      todoIds.forEach((todoId) => {
        this.handleSelect(todoId);
      });
      historyObject.push({ action: USERACTION.BULKTOGGLE, todoIds });
    } else {
      this.view.showSnackbar();
    }
  };

  handleDelete = async (
    todoId,
    historyObject = this.undoHistory,
    usingHistory = false
  ) => {
    const currTodoList = this.model.readAllTodos();
    const modelResponse = await this.model.deleteTodo(todoId);
    if (modelResponse) {
      this.view.deleteTodo(todoId);
      this.handleProgressRing();
      this.popFromHistory(historyObject, usingHistory);
      historyObject.push({
        action: USERACTION.DELETE,
        todoList: currTodoList,
      });
    } else {
      this.view.showSnackbar();
    }
  };

  handleBulkDelete = async (historyObject = this.undoHistory, usingHistory) => {
    const todoIds = Array.from(this.selectedTodos);
    const currTodoList = this.model.readAllTodos();
    const modelResponse = await this.model.deleteBulkTodos(todoIds);
    if (modelResponse) {
      const updatedTodoList = this.model.readAllTodos();
      this.view.renderTodosInDom(updatedTodoList);
      this.handleProgressRing();
      this.popFromHistory(historyObject, usingHistory);
      historyObject.push({
        action: USERACTION.BULKDELETE,
        todoList: currTodoList,
      });
      this.selectedTodos.clear();
    } else {
      this.view.showSnackbar();
    }
  };

  changleTodoListState = async (
    prevTodoList,
    historyObject = this.undoHistory,
    usingHistory
  ) => {
    const currTodoList = this.model.readAllTodos();
    const modelResponse = await this.model.changeTodoStoreState(prevTodoList);
    if (modelResponse) {
      const filteredTodos = this.model.readFilteredTodos(
        this.filter.date,
        this.filter.importance
      );
      this.view.renderTodosInDom(filteredTodos);
      this.handleProgressRing();
      this.popFromHistory(historyObject, usingHistory);
      historyObject.push({
        action: USERACTION.CHANGESTATE,
        todoList: currTodoList,
      });
    } else {
      this.view.showSnackbar();
    }
  };

  handleUndoRedo = (Event) => {
    let readHistoryObject, passHistoryObject;

    if (Event === USERACTION.UNDO) {
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
      case USERACTION.EDIT:
        const prevTodo = lastEventInHistory.todo;
        this.handleEdit(
          prevTodo.id,
          prevTodo.title,
          prevTodo.importance,
          passHistoryObject,
          true
        );
        break;

      case USERACTION.TOGGLE:
        const todoId = lastEventInHistory.todoId;
        this.handleToggle(todoId, passHistoryObject, true);
        break;

      case USERACTION.BULKTOGGLE:
        const todoIds = lastEventInHistory.todoIds;
        this.handleBulkToggle(passHistoryObject, true, todoIds);
        break;

      default:
        const prevTodoList = lastEventInHistory.todoList;
        this.changleTodoListState(prevTodoList, passHistoryObject, true);
    }
  };
}
