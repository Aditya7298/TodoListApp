import { handleAddForm } from "./addForm.js";
import {
  updateTodoInDom,
  deleteTodoFromDom,
  addNewTodoInDom,
  toggleTodoCompleteInDom,
  toggleSelectedTodosCompleteInDom,
} from "./renderTodos.js";

const history = [];
const redoHistory = [];

export const addEventToHistory = (evt, evtInfo, addToRedoHistory = false) => {
  let newHistoryObj, todo, index, todoIds, prevTodoList;

  switch (evt) {
    case "delete":
      [todo, index] = evtInfo;
      newHistoryObj = { lastEvtType: evt, todo, index };
      break;

    case "multiple-complete":
      [todoIds] = evtInfo;
      newHistoryObj = { lastEvtType: evt, todoIds };
      break;

    case "multiple-delete":
      [prevTodoList] = evtInfo;
      newHistoryObj = { lastEvtType: evt, prevTodoList };
      break;

    default:
      [todo] = evtInfo;
      console.log(todo);
      newHistoryObj = { lastEvtType: evt, todo };
  }

  if (addToRedoHistory) {
    redoHistory.push(newHistoryObj);
  } else {
    history.push(newHistoryObj);
  }
};

export const redoLastEvent = (evt, todoObj) => {
  if (redoHistory.length === 0) {
    console.log("No event found in redo history !!");
    return;
  }

  const lastEvt = redoHistory[redoHistory.length - 1];
  redoHistory.pop();

  const { lastEvtType, todo, index, todoIds } = { ...lastEvt };

  switch (lastEvtType) {
    case "update":
      updateTodoInDom(todo.id, todo.title, todo.importance);
      break;

    case "create":
      deleteTodoFromDom(todo.id);
      break;

    case "delete":
      addNewTodoInDom(null, null, todo, index);
      break;

    case "complete":
      toggleTodoCompleteInDom(todo.id);
      break;

    case "multiple-complete":
      toggleSelectedTodosCompleteInDom(todoIds);
      break;
  }
};

export const undoLastEvent = (handlingRedoEvent) => {
  if (history.length === 0) {
    console.log("No event found in history !!");
    return;
  }

  const lastEvt = history[history.length - 1];
  history.pop();

  const { lastEvtType, todo, index, todoIds } = { ...lastEvt };

  switch (lastEvtType) {
    case "update":
      updateTodoInDom(todo.id, todo.title, todo.importance, "no", true);
      break;

    case "create":
      deleteTodoFromDom(todo.id, "no", true);
      break;

    case "delete":
      addNewTodoInDom(null, null, todo, index, "no", true);
      break;

    case "complete":
      toggleTodoCompleteInDom(todo.id, "no", true);
      break;

    case "multiple-complete":
      toggleSelectedTodosCompleteInDom(todoIds, false);
  }
};
